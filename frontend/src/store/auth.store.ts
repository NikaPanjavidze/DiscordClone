import { create } from "zustand";
import { connectWithSocketServer, getSocket } from "../sockets/socket";
import type { IUser } from "../types/user.types";
import type { Socket } from "socket.io-client";

interface AuthState {
  user: IUser | null;
  socket: Socket | null;
  setUser: (user: IUser | null) => void;
  initSocket: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  socket: null,
  setUser: (user) => set({ user }),
  initSocket: () => {
    connectWithSocketServer();
    const socket = getSocket();
    set({ socket });
  },
}));
