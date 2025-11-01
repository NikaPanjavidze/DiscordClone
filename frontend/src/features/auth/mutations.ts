import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser } from "./api";
import toast from "react-hot-toast";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User Registered!");
    },
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("User Logged in!");
    },
  });
}
