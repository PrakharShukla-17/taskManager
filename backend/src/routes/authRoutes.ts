import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/authenticate';
import { registerSchema, loginSchema } from '../validators/schemas';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, getMe);

export default router;
