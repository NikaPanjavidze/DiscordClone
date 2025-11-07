import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../errors/customErrors";
import { IInvitationDocument, Invitation } from "../models/invitation.model";
import { User } from "../models/user.model";

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

  return invitation;
};
