import type { IUser } from "./user.types";

export type Invitation = {
  _id: string;
  receiverId: string;
  senderId: IUser;
};
