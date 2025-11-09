import { Invitation } from "../models/invitation.model";
import { IUserDocument, User } from "../models/user.model";
import { getActiveConnections, getSocketServer } from "../store/server.store";

export const updatePendingInvitations = async (userId: string) => {
  try {
    // find all active connections of userId
    const receiverList = getActiveConnections(userId);
    if (!receiverList?.length) return;

    const pendingInvitations = await Invitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    const io = getSocketServer();
    if (!io) return console.warn("Socket server not initialized");

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friend-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateFriends = async (userId: string) => {
  {
    try {
      // find all active connections of userId
      const receiverList = getActiveConnections(userId);
      if (!receiverList?.length) return;

      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username email"
      );

      if (user) {
        const friendsList = (user.friends as unknown as IUserDocument[]).map(
          (friend) => {
            return {
              _id: friend._id,
              email: friend.email,
              username: friend.username,
            };
          }
        );

        const io = getSocketServer();
        if (!io) return console.warn("Socket server not initialized");

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};
