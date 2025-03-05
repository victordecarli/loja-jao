import { Router } from 'express';
import { register, login, getMe, updateUser, deleteUser } from '@/controllers/userController';
import { checkJwt } from '@/middlewares/checkJwt';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', checkJwt, getMe);
router.put('/:id', checkJwt, updateUser);
router.delete('/:id', checkJwt, deleteUser);

export default router;
