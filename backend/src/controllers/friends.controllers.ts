import { Request, Response } from "express";
import { inviteUser } from "../services/friends.services";

export const inviteController = async (req: Request, res: Response) => {
  const { targetEmail } = req.body;
  const { id, email } = req.user!;
  const invitation = await inviteUser(targetEmail, id, email);
  res.status(201).json({
    data: invitation,
    message: "Invitation successfully sent",
  });
};
