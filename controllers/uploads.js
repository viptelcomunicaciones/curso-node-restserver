import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { response, request } from 'express';
import { subirarchivo } from '../helpers/subir-archivo.js';
import { Usuario } from '../models/usuario.js';
import { Producto } from '../models/producto.js';
import { Categoria } from '../models/categoria.js';

cloudinary.config({
    cloud_name: 'dd0umue8e',
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cargararchivospost = async (req = request, res = response) => {
    try {
        const nombre = await subirarchivo(req.files,undefined,'imagenes');
        res.status(200).json({ nombre:nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarimagen = async (req = request, res = response) => {
    const {id,coleccion} = req.params
    let model;
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`no existe el usuario con el ${id}`
                });
            }
            break;
        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`no existe el producto con el ${id}`
                });
            }
            break;
        default:
            return res.status(400).json({ msg: 'Colección no válida' });
    }

    // limpiar imagenes 
    if (model.img) {
        const imgpath= path.join(__dirname, '../uploads/', coleccion, model.img);
        if (fs.existsSync(imgpath)) {
            fs.unlinkSync(imgpath);
        }
    }

    const nombre = await subirarchivo(req.files,undefined,coleccion);
    model.img= nombre;
    await model.save();
    
    res.json(model)
};

const actualizarimagenclaudinary = async (req = request, res = response) => {
    const {id,coleccion} = req.params
    let model;
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`no existe el usuario con el ${id}`
                });
            }
            break;
        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`no existe el producto con el ${id}`
                });
            }
            break;
        default:
            return res.status(400).json({ msg: 'Colección no válida' });
    }

    // limpiar imagenes 
    if (model.img) {
        const nombreArl = model.img.split('/');
        const nombre = nombreArl[nombreArl.length -1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath}= req.files.archivo
    const {secure_url}= await cloudinary.uploader.upload(tempFilePath);
    model.img= secure_url;
    await model.save();
    
    res.json(model)
};

const mostrarimagen = async (req = request, res = response) => {
    const {id,coleccion} = req.params
    let model;
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`no existe el usuario con el ${id}`
                });
            }
            break;
        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`no existe el producto con el ${id}`
                });
            }
            break;
        default:
            return res.status(400).json({ msg: 'Colección no válida' });
    }

    // limpiar imagenes en local 
    //if (model.img) {
        //const imgpath= path.join(__dirname, '../uploads/', coleccion, model.img);
        //if (fs.existsSync(imgpath)) {
            //return res.sendFile(imgpath)
        //}
    //}

    //if (!model.img) {
        //const imgpath= path.join(__dirname, '../assets/no-image.jpg' );
        //if (fs.existsSync(imgpath)) {
            //return res.sendFile(imgpath)
        //}
    //}

    // Si tiene imagen de Cloudinary (URL completa), redirige directamente
    if (model.img && model.img.startsWith('http')) {
        return res.redirect(model.img);  // ← NUEVO: Redirige a Cloudinary CDN
    }

    // Fallback: imagen por defecto local (igual que antes)
    const imgpath = path.join(__dirname, '../assets/no-image.jpg');
    if (fs.existsSync(imgpath)) {
        return res.sendFile(imgpath);
    }

    // Si no existe ni Cloudinary ni default, error 404
    return res.status(404).json({ msg: 'Imagen no encontrada' });
};
export {
    cargararchivospost,
    actualizarimagen,
    mostrarimagen,
    actualizarimagenclaudinary
}