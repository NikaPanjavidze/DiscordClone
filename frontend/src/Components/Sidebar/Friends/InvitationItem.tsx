import React from "react";
import Button from "../../ui/Button";
import type { Invitation } from "../../../types/friends.types";
import {
  useAcceptInviteMutation,
  useRejectInviteMutation,
} from "../../../features/friends/mutations";

interface UserListItemProps {
  invitation: Invitation;
}

const InvitationItem: React.FC<UserListItemProps> = ({ invitation }) => {
  const { mutate: mutateReject, isPending: isRejectPending } =
    useRejectInviteMutation();

  const { mutate: mutateAccept, isPending: isAcceptPending } =
    useAcceptInviteMutation();

  return (
    <div
      key={invitation.senderId._id}
      className="flex items-center justify-between p-2 rounded-md bg-sidebar-accent/50"
    >
      <span className="text-sm font-medium text-sidebar-foreground">
        {invitation.senderId.username}
      </span>
      <div className="flex gap-2">
        <Button
          variant="primary"
          className="px-3 py-2 text-xs "
          onClick={() => mutateAccept(invitation._id)}
        >
          {isAcceptPending ? "Accepting..." : "Accept"}
        </Button>
        <Button
          onClick={() => mutateReject(invitation._id)}
          variant="ghost"
          className="px-3 py-2 text-xs border-border border"
        >
          {isRejectPending ? "Rejecting..." : "Ignore"}
        </Button>
      </div>
    </div>
  );
};

export default InvitationItem;
