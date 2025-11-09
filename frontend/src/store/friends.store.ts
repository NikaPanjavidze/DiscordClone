import { create } from "zustand";
import type { Invitation } from "../types/friends.types";
import type { IUser } from "../types/user.types";

interface FriendInvitationStore {
  pendingInvitations: Invitation[];
  setPendingInvitations: (invitations: Invitation[]) => void;
  friends: IUser[];
  setFriends: (friends: IUser[]) => void;
}

export const useFriendsStore = create<FriendInvitationStore>((set) => ({
  pendingInvitations: [],
  setPendingInvitations: (invitations) =>
    set({ pendingInvitations: invitations }),
  friends: [],
  setFriends: (friends) => {{
    set({friends: friends})
  }}
}));
