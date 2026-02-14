import { request, response } from "express";

const validararchivosubir = (req= request, res=response,next)=>{
    if (!req.files?.archivo) {
        return res.status(400).json({ msg: 'No hay archivo para subir' });
    }
    next(); 
}

export{
    validararchivosubir
}
