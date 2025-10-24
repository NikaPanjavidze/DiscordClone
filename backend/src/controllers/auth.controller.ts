import { Request, Response } from "express";
import { createUser } from "../services/user.services";
import { RegisterInput } from "../schemas/user.schemas";
import { StatusCodes } from "http-status-codes";

export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  const user = await createUser(req.body);
  res.status(StatusCodes.CREATED).json({
    data: {
      username: user.username,
      email: user.email,
    },
    message: "User successfully registered",
  });
};

export const loginUser = async (req: Request, res: Response) => {
  res.send("hi");
};

export const logoutUser = async (req: Request, res: Response) => {
  res.send("hi");
};
