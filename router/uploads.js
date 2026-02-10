import { Router } from 'express';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { validarjwt } from '../middlewares/validar-jwt.js';
import { adminrole, ValidarRoles } from '../middlewares/validar-roles.js';
import { check } from 'express-validator';
import { Emailexite, existecategoriabyid, existeproductobyid, Rolvalido } from '../helpers/db-validators.js';
import { cargararchivospost } from '../controllers/uploads.js';

export const router = Router();

// crear una categoria - privado con token - cualquier rol 
router.post('/', cargararchivospost
)
