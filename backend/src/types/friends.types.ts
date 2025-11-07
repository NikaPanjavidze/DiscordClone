import { Types } from "mongoose";

export interface IInvitation {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
}
