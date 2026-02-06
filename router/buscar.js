import { Router } from 'express';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { validarjwt } from '../middlewares/validar-jwt.js';
import { adminrole, ValidarRoles } from '../middlewares/validar-roles.js';
import { check } from 'express-validator';
import { Emailexite, existecategoriabyid, existeproductobyid, Rolvalido } from '../helpers/db-validators.js';
import { productogetid, productopost, productosdelete, productosget, productosput } from '../controllers/productos.js';
import { buscarget } from '../controllers/buscar.js';

export const router = Router();

// ver productos total - publico 
router.get('/:coleccion/:termino', buscarget
)