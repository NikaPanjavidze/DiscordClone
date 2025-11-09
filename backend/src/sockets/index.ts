import { Server, Socket } from "socket.io";
import { addConnectedUser } from "../store/server.store";
import { updateFriends, updatePendingInvitations } from "./friends.sockets";

export default function registerSocketHandlers(io: Server, socket: Socket) {
  const user = (socket as any).user;
  if (!user) return socket.disconnect();

  addConnectedUser(user.id, socket.id);

  updatePendingInvitations(user.id);
  updateFriends(user.id);

  //chatSocket(io, socket);
}
