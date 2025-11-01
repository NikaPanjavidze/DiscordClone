import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("You are not authorized");

    interface JwtPayload extends jwt.JwtPayload {
      id: string;
      email: string;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const userExists = await User.findById(decoded.id);
    if (!userExists) throw new Error("User not found.");

    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    next(error);
  }
};
