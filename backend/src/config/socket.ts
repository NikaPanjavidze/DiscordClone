import { Server, Socket } from "socket.io";
import registerSocketHandlers from "../sockets";
import { verifyTokenSocket } from "../middleware/auth.middleware";
import {
  getOnlineUsers,
  removeConnectedUser,
  setSocketServer,
} from "../store/server.store";

export const setupSocket = (io: Server) => {
  setSocketServer(io);

  io.use(verifyTokenSocket);

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket: Socket) => {
    registerSocketHandlers(io, socket);
    emitOnlineUsers();

    socket.on("disconnect", () => {
      removeConnectedUser(socket.id);
      emitOnlineUsers();
    });
  });
};
