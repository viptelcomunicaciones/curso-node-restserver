import { Router } from 'express';
import { userdelete, 
        userget, 
        userpatch, 
        userpost, 
        userput } from '../controllers/user.js';
import { check } from 'express-validator';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { Emailexite, Rolvalido } from '../helpers/db-validators.js';

export const router = Router();

router.get('/', userget
)
router.put('/', userput
)
router.put('/:id', userput
)
router.delete('/', userdelete
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