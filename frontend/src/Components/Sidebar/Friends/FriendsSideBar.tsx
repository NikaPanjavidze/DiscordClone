import React from "react";
import Button from "../../ui/Button";
import { Users } from "lucide-react";
import UserItem from "./UserItem";
import { UserProfile } from "./UserProfile";

const FriendsSideBar = () => {
  const mockUsers = [
    { id: 1, name: "testnr2", online: true },
    { id: 2, name: "testnr3", online: true },
  ];

  return (
    <aside className="w-60 bg-sidebar-background flex flex-col h-screen border-r border-sidebar-border">
      <div className="p-4  border-b border-sidebar-border">
        <Button
          variant="primary"
          className="w-full hover:bg-primary/90 font-medium"
        >
          <Users className="mr-2 h-4 w-4" /> Add Friend
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Private Messages
          </h2>
          <div className="space-y-1">
            {mockUsers.map((user) => (
              <UserItem user={user} />
            ))}
          </div>
        </div>
      </div>

      <UserProfile />
    </aside>
  );
};

export default FriendsSideBar;
