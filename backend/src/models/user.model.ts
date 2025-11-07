import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/user.types";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String, select: false },
    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>("User", userSchema);
