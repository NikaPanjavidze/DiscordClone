import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser, logoutUser } from "./api";
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

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logged out!");
    },
  });
}

