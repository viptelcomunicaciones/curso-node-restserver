import { Router } from 'express';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { validarjwt } from '../middlewares/validar-jwt.js';
import { adminrole, ValidarRoles } from '../middlewares/validar-roles.js';
import { check } from 'express-validator';
import { Emailexite, existecategoriabyid, existeproductobyid, Rolvalido } from '../helpers/db-validators.js';
import { productogetid, productopost, productosdelete, productosget, productosput } from '../controllers/productos.js';

export const router = Router();

// ver categorias total - privado 
router.get('/', productosget
)
// obtener categoria por id - publico
router.get('/:id',[
    //validaciones 
    check('id','No es id valido').isMongoId(),
    check('id').custom(existeproductobyid),
    ValidarCamposUsers
], productogetid
)
// crear una categoria - privado con token - cualquier rol 
router.post('/',[
    validarjwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es id valido').isMongoId(),
    check('categoria').custom(existecategoriabyid),
    ValidarCamposUsers
], productopost
)
//actualizar categoria -privado - con token -cualquier rol
router.put('/:id',[
//validaciones
    validarjwt,
    check('categoria','No es id valido').isMongoId().optional(),
    check('id').custom(existeproductobyid),
    ValidarCamposUsers
], productosput
)
// borrar categpria - privado - role admin 
router.delete('/:id',[
    validarjwt,
        // validacion de admin rol 
        //adminrole,
        ValidarRoles('admin_role'),
        check('id','No es id valido').isMongoId(),
        check('id').custom(existeproductobyid),
        ValidarCamposUsers
], productosdelete
)
