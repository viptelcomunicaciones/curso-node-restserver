import { Router } from 'express';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { validarjwt } from '../middlewares/validar-jwt.js';
import { adminrole, ValidarRoles } from '../middlewares/validar-roles.js';
import { check } from 'express-validator';
import { coleccionespermitidas, Emailexite, existecategoriabyid, existeproductobyid, Rolvalido } from '../helpers/db-validators.js';
import { actualizarimagen, cargararchivospost, mostrarimagen } from '../controllers/uploads.js';
import { validararchivosubir } from '../middlewares/validar-archivo.js';

const router = Router();

// crear una categoria - privado con token - cualquier rol 
router.post('/',validararchivosubir, cargararchivospost
)

router.put('/:coleccion/:id',[
    validararchivosubir,
    check('id','No es id valido').isMongoId(),
    check('coleccion').custom(c=>coleccionespermitidas(c,['usuarios','productos'])),
    ValidarCamposUsers
],actualizarimagen)

router.get('/:coleccion/:id',[
    check('id','No es id valido').isMongoId(),
    check('coleccion').custom(c=>coleccionespermitidas(c,['usuarios','productos'])),
    ValidarCamposUsers
],mostrarimagen)

export{
    router
}