import { response, request } from 'express';
import bcrypt from "bcrypt";
import { Producto } from '../models/producto.js';
import { body } from 'express-validator';

const productosget = async(req = request, res = response) => {

    const {limite =5,desde =0} = req.query
    const [total,producto] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
        .populate('usuario','nombre correo _id')
        .populate('categoria','nombre _id')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.status(200).json({ 
        total,
        producto
    })
}

const productogetid = async(req = request, res = response) => {

    
    const { id } = req.params;

    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre correo _id')
    .populate('categoria','nombre _id'); 
    res.status(200).json(producto);
}

const productosput = async(req, res = response) => {
    const id  = req.params.id;
    const {estado,usuario,...data} = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    
    if (!data.categoria) {
        delete data.categoria;  // undefined → Mongoose ignora
    }
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id,data,{new: true})
        .populate('usuario', 'nombre correo _id')
        .populate('categoria','nombre _id');
    res.status(200).json(producto);
}

const productopost = async(req, res = response) => {

    const {estado,usuario, ...body} = req.body;
    const nombre = body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({nombre})
    if (productoDB) {
        return res.status(400).json({
            msg : `EL producto ${productoDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data ={
        ...body,
        nombre,
        usuario : req.usuario._id,
    }

    const producto  = new Producto(data);
    //Guardar en DB
    await producto.save();

    res.status(201).json( producto);
}

const productosdelete = async(req, res = response) => {

    const id  = req.params.id;
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new: true})
        .populate('usuario', 'nombre correo _id')
        .populate('categoria','nombre _id');
        
    res.status(200).json(producto);
}

export {
    productopost,
    productosget,
    productosput,
    productosdelete,
    productogetid
}