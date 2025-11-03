import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser, logoutUser } from "./api";
import toast from "react-hot-toast";
import { connectWithSocketServer } from "../../sockets/socket";

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
      connectWithSocketServer();
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

