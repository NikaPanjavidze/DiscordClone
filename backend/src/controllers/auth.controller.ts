import { NextFunction, Request, Response } from "express";
import { createUser, loginUser } from "../services/user.services";
import { LoginInput, RegisterInput } from "../schemas/user.schemas";
import { StatusCodes } from "http-status-codes";

export const registerController = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
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

export const loginController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  const { user, token } = await loginUser(req.body);

  res
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 7000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(StatusCodes.OK)
    .json({
      data: {
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
      },
    });
};

export const logoutController = async (req: Request, res: Response) => {
  res.send("hi");
};
