import { Server, Socket } from "socket.io";
import registerSocketHandlers from "../sockets";
import { verifyTokenSocket } from "../middleware/auth.middleware";
import { removeConnectedUser } from "../store/server.store";

export const setupSocket = (io: Server) => {
  io.use(verifyTokenSocket)

  io.on("connection", (socket: Socket) => {
    registerSocketHandlers(io, socket);

    socket.on("disconnect", () => {
      removeConnectedUser(socket.id);
    });
  });
};
