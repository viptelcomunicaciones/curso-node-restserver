import { response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcrypt from "bcrypt";


const userget = async(req = request, res = response) => {
    
    //const {id,name,apikey,pag=1,limit=10}= req.query;
    const {limite =5,desde =0} = req.query

    //const usuarios = await Usuario.find({estado:true})
        //.limit(Number(limite))
        //.skip(Number(desde));

    //const total = await Usuario.countDocuments({estado:true});

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.status(200).json({ 
        total,
        usuarios
    })
}

const userput = async(req, res = response) => {
    const id  = req.params.id;
    const {_id,password,google,estado,...resto}= req.body;
    if (password) {
        // Encryptar la contraseña 
        const salt = bcrypt.genSaltSync(15);
        resto.password = bcrypt.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new: true});
    res.status(200).json(usuario);
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

const userdelete = async(req, res = response) => {
    const {id}= req.params;
    //eliminar usuario fisicamente 
    //const usuario = await Usuario.findByIdAndDelete(id);
    //Actualizar a estado inactivo
    const usuarioactivo = await Usuario.findByIdAndUpdate(id,{estado:false},{new: true});
    res.status(200).json(usuarioactivo);
}

export {
    userget,
    userput,
    userpost,
    userdelete,
    userpatch
}