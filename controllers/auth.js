import { response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcrypt from "bcrypt";
import { generarjwt } from '../helpers/generar-jwt.js';
import { googleverify } from '../helpers/google-verify.js';

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

const googleSingIn = async(req = request, res = response) => {
    
        try {
            const googleuse = await googleverify(req.body.id_token)
            let usuario = await Usuario.findOne({ correo: googleuse.correo });
        if (!usuario) {
        const dummyPassword = ':)';
        const data = {
            nombre : googleuse.nombre,
            correo : googleuse.correo,
            img : googleuse.img,
            password : bcrypt.hashSync(dummyPassword, bcrypt.genSaltSync(15)),
            google : true,
            rol : "user_role"
        }
        usuario = new Usuario(data);
        await usuario.save();
        }
        if (usuario.estado === false) {
            return res.status(401).json({
                msg : 'Hable con el administrador - Usuario Bloqueado'
            });
        }

        const token = await generarjwt(usuario.id);
    
        return res.status(200).json({
        usuario,
        token
        });
        
        } catch (error) {
            console.error('Error en googleSingIn:', error.message);  // ← LOG COMPLETO
            res.status(400).json({
            msg: 'Error con Google: ' + error.message
        });
        }   
}

export {
    authpost,
    googleSingIn
}