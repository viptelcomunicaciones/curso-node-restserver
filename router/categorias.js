import { Router } from 'express';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { validarjwt } from '../middlewares/validar-jwt.js';
import { adminrole, ValidarRoles } from '../middlewares/validar-roles.js';
import { check } from 'express-validator';
import { Emailexite, exiteusuariobyid, Rolvalido } from '../helpers/db-validators.js';
import { categoriasdelete, categoriasget, categoriasgetid, categoriaspost, categoriasput } from '../controllers/categorias.js';

export const router = Router();

// ver categorias total - privado 
router.get('/', categoriasget
)
// obtener categoria por id - publico
router.get('/:id', categoriasgetid
)
// crear una categoria - privado con token - cualquier rol 
router.post('/',[
    validarjwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    ValidarCamposUsers
], categoriaspost
)
//actualizar categoria -privado - con token -cualquier rol
router.put('/:id',[

], categoriasput
)
// borrar categpria - privado - role admin 
router.delete('/:id',[

], categoriasdelete
)
