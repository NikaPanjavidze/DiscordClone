import { Server } from "socket.io";

//key = userId, value = socketId
const connectedUsers = new Map<string, string>();

let io: Server | null = null;

export const setSocketServer = (ioInstance: Server) => {
  io = ioInstance;
};

export const getSocketServer = () => {
  return io;
};

export const addConnectedUser = (userId: string, socketId: string) => {
  connectedUsers.set(userId, socketId);
  console.log("✅ User connected:", Array.from(connectedUsers.entries()));
};

export const removeConnectedUser = (socketId: string) => {
  for (const [userId, id] of connectedUsers.entries()) {
    if (id === socketId) {
      connectedUsers.delete(userId);
      console.log(`🔴 User disconnected: socket: ${socketId} user: ${userId} `);
      break;
    }
  }
};

export const getActiveConnections = (userId: string) => {
  const activeConnections: string[] = [];

  connectedUsers.forEach((socketId, storedUserId) => {
    if (storedUserId === userId) {
      activeConnections.push(socketId);
    }
  });

  console.log("active conns", activeConnections);
  return activeConnections;
};

export const getConnectedUsers = () => {
  return Array.from(connectedUsers.keys());
};

export const getUserSocketId = (userId: string) => {
  return connectedUsers.get(userId);
};

export const getOnlineUsers = () => {
  const onlineUsers: {socketId: string, userId:string}[] = [];

  connectedUsers.forEach((socketId, userId) => {
    onlineUsers.push({ socketId, userId });
  });

  return onlineUsers;
};
