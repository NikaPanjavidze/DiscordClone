import express from "express";
import validateResource from "../middleware/validator.middleware";
import { friendInvitationSchema } from "../schemas/friends.schemas";
import { protectRoute } from "../middleware/auth.middleware";
import { inviteController } from "../controllers/friends.controllers";

const router = express.Router();

router.route("/").post(protectRoute, validateResource(friendInvitationSchema), inviteController);



export default router;