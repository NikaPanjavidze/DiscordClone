import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "./api";
import toast from "react-hot-toast";

export function useInviteMutation() {
  return useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      toast.success("User invited.");
    },
  });
}
