import { Role } from '../models/role.js';
import { Usuario } from '../models/usuario.js';
const Rolvalido = async(rol = '')=>{
        const exiterol = await Role.findOne({rol});
        if (!exiterol) {
                throw new Error(`El rol ${rol} no esta registrado en la BD`)
        }
}

const Emailexite = async(correo = '')=>{
        const exitemail = await Usuario.findOne({correo});
        if (exitemail) {
                throw new Error(`El correo ${correo} ya esta registrado en la BD`)
        }
}

const exiteusuariobyid = async(id)=>{
        const exiteusuario = await Usuario.findById(id);
        
        if (!exiteusuario) {
                throw new Error(`El id : ${id} no existe`)
        }
}

export{
        Rolvalido,
        Emailexite,
        exiteusuariobyid
}