import { Router } from 'express';
import { get1, getelements, getgeneric, getinicio, userdelete, 
        userget,
        userpatch, 
        userpost, 
        userput } from '../controllers/user.js';

export const router = Router();

router.get('/', get1
)
router.get('/inicio', getinicio
)
router.get('/generic', getgeneric
)
router.get('/elements', getelements
)
router.get('/api/user', userget
)
router.put('/api/user', userput
)
router.put('/api/user/:id', userput
)
router.delete('/api/user', userdelete
)
router.post('/api/user', userpost
)
router.patch('/api/user', userpatch
)