import { response, request } from 'express';
import bcrypt from "bcrypt";
import { Categoria } from '../models/categoria.js';

const categoriasget = async(req = request, res = response) => {

    const {limite =5,desde =0} = req.query
    const [total,categoria] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        .populate('usuario','nombre correo _id')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.status(200).json({ 
        total,
        categoria
    })
}

const categoriasgetid = async(req = request, res = response) => {

    
    const { id } = req.params;

    const categoria = await Categoria.findById(id)
    .populate('usuario', 'nombre correo _id'); 
    res.status(200).json(categoria);
}

const categoriasput = async(req, res = response) => {
    const id  = req.params.id;
    const {estado,usuario,...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true})
        .populate('usuario', 'nombre correo _id');
    res.status(200).json(categoria);
}

const categoriaspost = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre : nombre})
    if (categoriaDB) {
        return res.status(400).json({
            msg : `la categofia ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data ={
        nombre,
        usuario : req.usuario._id
    }

    const categoria  = new Categoria(data);
    //Guardar en DB
    await categoria.save();

    res.status(201).json( categoria);
}

const categoriasdelete = async(req, res = response) => {

    const id  = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new: true})
        .populate('usuario', 'nombre correo _id');
    res.status(200).json(categoria);
}

export {
    categoriaspost,
    categoriasget,
    categoriasput,
    categoriasdelete,
    categoriasgetid
}