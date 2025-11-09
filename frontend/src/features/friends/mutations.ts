import { useMutation } from "@tanstack/react-query";
import { acceptInvite, inviteUser, rejectInvite } from "./api";
import toast from "react-hot-toast";

export function useInviteMutation() {
  return useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      toast.success("User invited.");
    },
  });
}

export function useAcceptInviteMutation() {
  return useMutation({
    mutationFn: (id: string) => acceptInvite(id),
    onSuccess: () => {
      toast.success("Invitation accepted.")
    },
  });
}


export function useRejectInviteMutation() {
  return useMutation({
    mutationFn: (id: string) => rejectInvite(id),
    onSuccess: () => {
      toast.success("Invitation rejected.")
    }
  })
}