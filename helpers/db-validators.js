import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';
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

const existeusuariobyid = async(id)=>{
        const existeusuario = await Usuario.findById(id);
        
        if (!existeusuario) {
                throw new Error(`El id : ${id} no existe`)
        }
}

const existecategoriabyid = async(id)=>{
        const existecategoria = await Categoria.findById(id);
        
        if (!existecategoria) {
                throw new Error(`El id : ${id} no existe`)
        }
}

const existeproductobyid = async(id)=>{
        const existeproducto = await Producto.findById(id);
        
        if (!existeproducto) {
                throw new Error(`El id : ${id} no existe`)
        }
}

export{
        Rolvalido,
        Emailexite,
        existeusuariobyid,
        existecategoriabyid,
        existeproductobyid
}