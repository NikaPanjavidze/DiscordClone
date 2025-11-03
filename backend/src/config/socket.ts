import { Server, Socket } from "socket.io";
import registerSocketHandlers from "../sockets";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    registerSocketHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
};
