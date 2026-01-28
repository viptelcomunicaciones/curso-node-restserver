import { response, request } from 'express';
import bcrypt from "bcrypt";
import { Categoria } from '../models/categoria.js';
import { Usuario } from '../models/usuario.js';

const categoriasget = async(req = request, res = response) => {

    res.status(200).json({'msg': 'todo ok -get'
    })
}

const categoriasgetid = async(req = request, res = response) => {

    res.status(200).json({'msg': 'todo ok -get id'
    })
}

const categoriasput = async(req, res = response) => {

    res.status(200).json({'msg': 'todo ok - put'});
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

    res.status(200).json({
        'msg': 'todo ok - delete'
    });
}

export {
    categoriaspost,
    categoriasget,
    categoriasput,
    categoriasdelete,
    categoriasgetid
}