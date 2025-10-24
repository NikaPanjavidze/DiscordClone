import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import validateResource from '../middleware/validator.middleware';
import { loginSchema, registerSchema } from '../schemas/user.schemas';

const router = express.Router();

router.post("/register", validateResource(registerSchema), registerUser)
router.post("/login", validateResource(loginSchema), loginUser)
router.post("/logout", logoutUser)

export default router;