import mongoose, { Document } from "mongoose";
import { IInvitation } from "../types/friends.types";

export interface IInvitationDocument extends IInvitation, Document {}

const invitationSchema = new mongoose.Schema<IInvitationDocument>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Invitation = mongoose.model<IInvitationDocument>(
  "Invitation",
  invitationSchema
);
