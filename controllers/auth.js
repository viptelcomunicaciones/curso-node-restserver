import { response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcrypt from "bcrypt";
import { generarjwt } from '../helpers/generar-jwt.js';

const authpost = async(req = request, res = response) => {
    const {correo,password,} = req.body
    try {
        //verificar si email exite
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg : ' Usuario / Contraseña no son correctos -correo'
            });
        }
        
        // verificar si el usuario esta activo 
        if (usuario.estado === false) {
            return res.status(400).json({
                msg : ' Usuario / Contraseña no son correctos -estado : false'
            });
        }

        // verificar contraseña 
        const validacontraseña = bcrypt.compareSync(password,usuario.password);
        if (!validacontraseña) {
            return res.status(400).json({
                msg : ' Usuario / Contraseña no son correctos -password'
            });
        }

        //Generar el JWT

        const token = await generarjwt(usuario.id)
        
        res.status(200).json({ 
        usuario,
        token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
        msg: 'patch API-- controller ' })
    }
    
}

export {
    authpost,
}