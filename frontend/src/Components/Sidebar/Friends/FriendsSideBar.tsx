import React, { useState } from "react";
import Button from "../../ui/Button";
import { Users } from "lucide-react";
import UserItem from "./UserItem";
import { UserProfile } from "./UserProfile";
import { Modal } from "../../ui/Modal";
import InviteForm from "../../Form/InviteForm";
import { useFriendsStore } from "../../../store/friends.store";
import InvitationItem from "./InvitationItem";
import { useUsersStore } from "../../../store/users.store";
import type { IUser } from "../../../types/user.types";

const FriendsSideBar = () => {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const { pendingInvitations, friends } = useFriendsStore();
  const { onlineUsers } = useUsersStore();

  const checkOnlineUsers = (
    friends: IUser[] = [],
    onlineUsers: { socketId: string; userId: string }[] = []
  ) => {
    console.log("online:", onlineUsers);
    console.log("friends:", friends);

    return friends.map((friend) => ({
      ...friend,
      isOnline: onlineUsers.some((user) => user.userId === friend._id),
    }));
  };

  return (
    <aside className="w-60 bg-sidebar-background flex flex-col h-screen border-r border-sidebar-border">
      <div className="p-4  border-b border-sidebar-border">
        <Button
          onClick={() => setIsAddFriendOpen(true)}
          variant="primary"
          className="w-full hover:bg-primary/90 font-medium"
        >
          <Users className="mr-2 h-4 w-4" /> Add Friend
        </Button>
      </div>

      <Modal
        open={isAddFriendOpen}
        onClose={() => setIsAddFriendOpen(false)}
        title="Add Friend"
      >
        <InviteForm />
      </Modal>

      <div className="flex-1 overflow-y-auto">
        {pendingInvitations.length > 0 && (
          <div className="p-3 border-b border-sidebar-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Invitations — {pendingInvitations.length}
            </h2>
            <div className="space-y-2">
              {pendingInvitations.map((invitation) => (
                <InvitationItem invitation={invitation} />
              ))}
            </div>
          </div>
        )}
        <div className="p-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Private Messages
          </h2>
          <div className="space-y-1">
            {checkOnlineUsers(friends, onlineUsers).map((friend) => (
              <UserItem friend={friend} />
            ))}
          </div>
        </div>
      </div>

      <UserProfile />
    </aside>
  );
};

export default FriendsSideBar;
