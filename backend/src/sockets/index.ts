import { Server, Socket } from "socket.io";
import { addConnectedUser } from "../store/server.store";

export default function registerSocketHandlers(io: Server, socket: Socket) {
  const user = (socket as any).user;
  if (!user) return socket.disconnect();

    addConnectedUser(user.id, socket.id);


  //chatSocket(io, socket);
}
