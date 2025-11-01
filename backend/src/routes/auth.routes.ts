import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";
import validateResource from "../middleware/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/user.schemas";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validateResource(registerSchema), registerController);
router.post("/login", validateResource(loginSchema), loginController);
router.post("/logout", protectRoute, logoutController);

export default router;
