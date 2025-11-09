import { Types } from "mongoose";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../errors/customErrors";
import { IInvitationDocument, Invitation } from "../models/invitation.model";
import { User } from "../models/user.model";
import { updateFriends, updatePendingInvitations } from "../sockets/friends.sockets";

export const inviteUser = async (
  targetEmail: string,
  userId: string,
  userEmail: string
): Promise<IInvitationDocument> => {
  if (userEmail.toLowerCase() === targetEmail.toLowerCase()) {
    throw new BadRequestError("Sorry, You can not add yourself.");
  }

  const targetUser = await User.findOne({ email: targetEmail.toLowerCase() });

  if (!targetUser) {
    throw new NotFoundError("A User with this email address does not exist");
  }

  const invitationAlreadyReceived = await Invitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived) {
    throw new ConflictError("Friend request has been already sent.");
  }

  const usersAlreadyFriends = targetUser.friends?.find(
    (friendId) => friendId.toString() === userId
  );

  if (usersAlreadyFriends) {
    throw new ConflictError("You are already friends with this person.");
  }

  const invitation = await Invitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  //send pending invitations update to specific user
  updatePendingInvitations((targetUser._id as Types.ObjectId).toString());

  return invitation;
};

export const acceptInvite = async (id: string) => {
  const acceptedInvitation = await Invitation.findByIdAndDelete(id);

  if (!acceptedInvitation) {
    throw new NotFoundError("The invitation does not exist.");
  }

  const { senderId, receiverId } = acceptedInvitation;

  //update both users friend list
  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);
  receiver!.friends = [...receiver!.friends!, senderId];
  sender!.friends = [...sender!.friends!, receiverId];
  await receiver!.save();
  await sender!.save();

  //todo: update list of friends (socket) if users are online
  await updateFriends(senderId.toString());
  await updateFriends(receiverId.toString())

  //update pending invitations
  await updatePendingInvitations(senderId.toString());
  await updatePendingInvitations(receiverId.toString());
};

export const rejectInvite = async (id: string, userId: string) => {
  const rejectedInvitation = await Invitation.findByIdAndDelete(id);

  if (!rejectedInvitation) {
    throw new NotFoundError("The invitation does not exist.");
  }

  //update pending invitations
  await updatePendingInvitations(userId);
};
