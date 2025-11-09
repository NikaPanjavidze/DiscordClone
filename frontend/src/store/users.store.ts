import { create } from "zustand";
import type { IUser } from "../types/user.types";

interface UsersStore {
  onlineUsers: { socketId: string; userId: string }[];
  setOnlineUsers: (users: { socketId: string; userId: string }[]) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },
}));
