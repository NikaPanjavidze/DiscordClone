import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5002";

export const connectWithSocketServer = () => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      withCredentials: true,
      //   autoConnect: false,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server:", socket!.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
    });
  }
};

// Getter function to use socket instance safely in other files
export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error(
      "Socket not initialized. Call connectWithSocketServer() first."
    );
  }
  return socket;
};
