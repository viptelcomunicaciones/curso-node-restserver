import { Router } from 'express';
import { check } from 'express-validator';
import { ValidarCamposUsers } from '../middlewares/validations.js';
import { authpost } from '../controllers/auth.js';

export const router = Router();

router.post('/login',[
        //verificaciones 
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('correo','El correo no es valido').isEmail(),
        ValidarCamposUsers
], authpost
)
