import { NextFunction, Request, Response } from "express";
import { createUser, getUserById, loginUser } from "../services/user.services";
import { LoginInput, RegisterInput } from "../schemas/user.schemas";
import { StatusCodes } from "http-status-codes";

export const registerController = async (
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
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(StatusCodes.NO_CONTENT)
    .json({ success: true, message: "Logged out" });
};

export const getMeController = async (req: Request, res: Response) => {
  const user = req.user;

  //If no user on req that means we are not authenticated
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized. Please login." });
  }

  const me = await getUserById(user.id);
  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      user: {
        _id: me.id,
        email: me.email,
        username: me.username,
      },
    },
  });
};
