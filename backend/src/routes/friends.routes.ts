import express from "express";
import validateResource from "../middleware/validator.middleware";
import { friendInvitationSchema } from "../schemas/friends.schemas";
import { protectRoute } from "../middleware/auth.middleware";
import {
  acceptInviteController,
  inviteController,
  rejectInviteController,
} from "../controllers/friends.controllers";

const router = express.Router();

router
  .route("/")
  .post(
    protectRoute,
    validateResource(friendInvitationSchema),
    inviteController
  );
router
  .route("/:id")
  .post(protectRoute, acceptInviteController)
  .delete(protectRoute, rejectInviteController);

export default router;
