import React from "react";
import Button from "../../ui/Button";
import type { IUser } from "../../../types/user.types";

interface FriendType extends IUser {
  isOnline: boolean;
}

interface UserListItemProps {
  friend: FriendType;
}

const UserItem: React.FC<UserListItemProps> = ({ friend }) => {
  console.log(friend)
  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-start gap-3 p-2 rounded-md bg-none text-left group "
    >
      <div className="relative">
        <img
          src="https://avatar.iran.liara.run/public/38"
          className="h-8 w-8"
        ></img>
        {friend.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />
        )}
      </div>
      <span className="text-sm font-medium text-sidebar-foreground group-hover:text-foreground ">
        {friend.username}
      </span>
    </Button>
  );
};

export default UserItem;
