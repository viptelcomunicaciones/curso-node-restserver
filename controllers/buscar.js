import { response, request } from 'express';
import bcrypt from "bcrypt";
import { Producto } from '../models/producto.js';
import { body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { Usuario } from '../models/usuario.js';
import { Categoria } from '../models/categoria.js';

const coleccionespermitidas =[
        'usuarios',
        'categorias',
        'productos',
        'roles'
    ]
    
const buscarusuario = async(termino = "", res = response) =>{
    const ismongoid = isValidObjectId(termino);
    if (ismongoid) {
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({
            result:(usuario)
            ? [usuario]
            : []})
    }
    const regex = new RegExp(termino,'i');
    const total = await Usuario.countDocuments({
    $or: [{ nombre: regex }, { correo: regex }],
    estado: true
    });
    const usuarios = await Usuario.find({
        $or: [{nombre : regex}, {correo : regex}],
        $and:[{ estado: true}]
    });

    res.status(200).json({ 
    total,
    usuarios
    })
}

const buscarcategoria = async(termino = "", res = response) =>{
    const ismongoid = isValidObjectId(termino);
    if (ismongoid) {
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({
            result:(categoria)
            ? [categoria]
            : []})
    }
    const regex = new RegExp(termino,'i');
    const total = await Categoria.countDocuments({
        $or: [{ nombre: regex }],
        estado: true
    });
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and:[{ estado: true}]
    });

    res.status(200).json({ 
    total,
    categorias
    })
}

const buscarproducto = async(termino = "", res = response) =>{
    const ismongoid = isValidObjectId(termino);
    if (ismongoid) {
        const producto = await Producto.findById(termino)
                        .populate('categoria','nombre')
                        .populate('usuario','nombre correo _id');
        return res.status(200).json({
            result:(producto)
            ? [producto]
            : []})
    }

    const regex = new RegExp(termino,'i');
    const total = await Producto.countDocuments({
        $or: [{ nombre: regex }],
        estado: true
    });
    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and:[{ estado: true}]
    })
    .populate('categoria','nombre')
    .populate('usuario','nombre correo _id');

    res.status(200).json({ 
    total,
    productos
    })
}

const buscarget = async(req = request, res = response) => {
    
    
    const { coleccion,termino } = req.params;

    if (!coleccionespermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg : `la ${coleccion} no es permitida las categegias permitidas son ${coleccionespermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarusuario(termino,res);
            break;
        case 'categorias':
            buscarcategoria(termino,res);
            break;
        case 'productos':
            buscarproducto(termino,res);
            break;
        default:
            res.status(500).json({
                msg : 'no esta hecha la busqueda'
            })
            break;
    }
}

export {
    buscarget,
}