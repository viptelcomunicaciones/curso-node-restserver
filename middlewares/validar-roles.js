import { request } from "express";
import { response } from "express";


const adminrole = (req = request,res= response, next) =>{
    if (!req.usuario) {
        return res.status(500).json({
            msg : 'se desea verificar rol sin token inicial'
        })
    };

    if (req.usuario.rol !== 'admin_role') {
        return res.status(401).json({
            msg : `${req.usuario.nombre} no tiene rol administrador`
        });
    }
    
    next();
}

const ValidarRoles = ( ...roles) =>{
    return (req = request, res = response, next) =>{
        if (!req.usuario) {
        return res.status(500).json({
            msg : 'se desea verificar rol sin token inicial'
        })
        };
        
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg : `El servicio requiere uno de estos roles ${roles}`
            });
        }
        
    next();
    } 
}

export {
    adminrole,
    ValidarRoles
}