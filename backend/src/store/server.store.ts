//key = userId, value = socketId
const connectedUsers = new Map<string, string>();

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

export const getConnectedUsers = () => {
  return Array.from(connectedUsers.keys());
};

export const getUserSocketId = (userId: string) => {
  return connectedUsers.get(userId);
};
