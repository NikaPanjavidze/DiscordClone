import { io, Socket } from "socket.io-client";
import { useFriendsStore } from "../store/friends.store";
import { useUsersStore } from "../store/users.store";

let socket: Socket | null = null;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5002";

const { setPendingInvitations, setFriends } = useFriendsStore.getState();
const { setOnlineUsers } = useUsersStore.getState();

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

    socket.on("friend-invitations", (data) => {
      const { pendingInvitations } = data;
      console.log("friends invitation data came", pendingInvitations);
      setPendingInvitations(pendingInvitations);
    });

    socket.on("friends-list", (data) => {
      const { friends } = data;
      setFriends(friends);
    });

    socket.on("online-users", (data) => {
      const { onlineUsers } = data;
      setOnlineUsers(onlineUsers);
    });
  }
};

// Getter function for using socket instance safely in other files
export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error(
      "Socket not initialized. Call connectWithSocketServer() first."
    );
  }
  return socket;
};
