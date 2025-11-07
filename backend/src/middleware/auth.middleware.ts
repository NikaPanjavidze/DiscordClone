import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ExtendedError, Socket } from "socket.io";
import { UnauthorizedError } from "../errors/customErrors";
import * as cookie from "cookie";
import { ENV } from "../config/env";

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

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const userExists = await User.findById(decoded.id);
    if (!userExists) throw new Error("User not found.");

    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyTokenSocket = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const rawCookie = socket.handshake.headers.cookie;
  if (!rawCookie) return next(new UnauthorizedError("No cookies found"));
  
  const cookies = cookie.parse(rawCookie);
  const token = cookies.token;
  if (!token) return next(new UnauthorizedError("No token provided"));

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    (socket as any).user = decoded;
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};
