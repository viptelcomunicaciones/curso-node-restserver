import { Router } from 'express';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { validarjwt } from '../middlewares/validar-jwt.js';
import { adminrole, ValidarRoles } from '../middlewares/validar-roles.js';
import { userdelete, 
        userget, 
        userpatch, 
        userpost, 
        userput } from '../controllers/user.js';
import { check } from 'express-validator';
import { Emailexite, exiteusuariobyid, Rolvalido } from '../helpers/db-validators.js';

export const router = Router();

router.get('/', userget
)
router.put('/', userput
)
router.put('/:id',[
        //validaciones 
        check('id','No es id valido').isMongoId(),
        check('id').custom(exiteusuariobyid),
        check('rol').custom(Rolvalido),
        ValidarCamposUsers
], userput
)
router.delete('/:id',[
        validarjwt,
        // validacion de admin rol 
        //adminrole,
        ValidarRoles('admin_role','send_role'),
        check('id','No es id valido').isMongoId(),
        check('id').custom(exiteusuariobyid),
        ValidarCamposUsers
], userdelete
)
router.post('/',[
        //verificaciones 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password debe ser de mas de 6 caracteres').isLength({min:6}),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('correo','El correo no es valido').isEmail(),
        check('correo').custom(Emailexite),
        //check('rol','Nos es un rol valido').isIn(['Admin_role','user_role']),
        check('rol').custom(Rolvalido),
        ValidarCamposUsers
], userpost
)
router.patch('/', userpatch
)