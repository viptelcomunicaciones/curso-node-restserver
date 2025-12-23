import { Router } from 'express';
import { userdelete, 
        userget, 
        userpatch, 
        userpost, 
        userput } from '../controllers/user.js';

export const router = Router();

router.get('/', userget
)
router.put('/', userput
)
router.put('/:id', userput
)
router.delete('/', userdelete
)
router.post('/', userpost
)
router.patch('/', userpatch
)