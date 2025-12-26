import { Schema,model  } from "mongoose";

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique:true
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['Admin_role','user_role']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default:true
    },
});

const Usuario = model('Usuario', UsuarioSchema);

export {
    Usuario,
}