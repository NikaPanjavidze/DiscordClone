import { Types } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  friends?: Types.ObjectId[];
}
