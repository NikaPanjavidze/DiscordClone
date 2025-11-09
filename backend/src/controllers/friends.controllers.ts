import { Request, Response } from "express";
import {
  acceptInvite,
  inviteUser,
  rejectInvite,
} from "../services/friends.services";
import { StatusCodes } from "http-status-codes";

export const inviteController = async (req: Request, res: Response) => {
  const { targetEmail } = req.body;
  const { id, email } = req.user!;
  const invitation = await inviteUser(targetEmail, id, email);
  res.status(StatusCodes.CREATED).json({
    data: invitation,
    message: "Invitation successfully sent",
  });
};

export const acceptInviteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  acceptInvite(id);
  res.status(StatusCodes.OK).json({ message: "Invitation accepted." });
};

export const rejectInviteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  rejectInvite(id, userId);
  res.status(StatusCodes.OK).json({ message: "Invitation rejected." });
};
