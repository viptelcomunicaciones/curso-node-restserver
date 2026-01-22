import { request, response } from "express"
import jsonwebtoken from "jsonwebtoken"
import { Usuario } from '../models/usuario.js';

const validarjwt = async(req=request,res = response, next ) =>{
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({
            msg : 'no hay token en la peticion'
        })
    }
    try {
        const { uid } = jsonwebtoken.verify(token,process.env.SECRETORPRIVATEKEY);
        //leer usuario uid 
        const usuario = await Usuario.findById(uid);
        // usuario no existe 
        if (!usuario) {
            return res.status(401).json({
            msg : 'token no valido - usuario no exite en BD'
            })
        }
        //verificar que el uid estado true
        if (!usuario.estado) {
            return res.status(401).json({
            msg : 'token no valido - estado : false'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : 'token no valido'
        })
    }
    
    
}
export {
    validarjwt
}