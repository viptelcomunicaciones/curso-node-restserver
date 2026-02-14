import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { response, request } from 'express';
import { subirarchivo } from '../helpers/subir-archivo.js';
import { Usuario } from '../models/usuario.js';
import { Producto } from '../models/producto.js';
import { Categoria } from '../models/categoria.js';

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

    // limpiar imagenes 
    if (model.img) {
        const imgpath= path.join(__dirname, '../uploads/', coleccion, model.img);
        if (fs.existsSync(imgpath)) {
            return res.sendFile(imgpath)
        }
    }

    if (!model.img) {
        const imgpath= path.join(__dirname, '../assets/no-image.jpg' );
        if (fs.existsSync(imgpath)) {
            return res.sendFile(imgpath)
        }
    }
};
export {
    cargararchivospost,
    actualizarimagen,
    mostrarimagen
}