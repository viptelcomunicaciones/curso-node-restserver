import { response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcrypt from "bcrypt";


const userget = (req = request, res = response) => {
    
    const {id,name,apikey,pag=1,limit=10}= req.query;
    res.status(200).json({ 
        msg: 'get API-- controller ',
        id,
        name,
        apikey,
        pag,
        limit
    })
}

const userput = (req, res = response) => {
    const id  = req.params.id
    res.status(200).json({ 
        msg: 'put API-- controller ',
        id
    })
}

const userpost = async(req, res = response) => {
    
    const {nombre,correo,password,rol} = req.body
    const usuario = new Usuario({nombre,correo,password,rol});
    
    // Encryptar la contraseña 
    const salt = bcrypt.genSaltSync(15);
    usuario.password = bcrypt.hashSync(password,salt);

    // Guardar Base de datos 
    await usuario.save();
    res.status(200).json({ 
        usuario
    })
}

const userpatch = (req, res = response) => {
    res.status(200).json({ 
        msg: 'patch API-- controller ' })
}

const userdelete = (req, res = response) => {
    res.status(200).json({ 
        msg: 'delete API-- controller ' })
}

export {
    userget,
    userput,
    userpost,
    userdelete,
    userpatch
}