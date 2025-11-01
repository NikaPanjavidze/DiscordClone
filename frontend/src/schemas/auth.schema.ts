import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email("Please enter a valid email address."),
  password: z
    .string({ message: "Password is required." })
    .min(6, "Password must be at least 6 characters long."),
});

export type LoginFormFields = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, "Username must be at least 3 characters long.")
    .max(12, "Username cannot exceed 12 characters."),
  email: z
    .string({ message: "Email is required." })
    .email("Please enter a valid email address."),
  password: z
    .string({ message: "Password is required." })
    .min(6, "Password must be at least 6 characters long."),
});

export type RegisterFormFields = z.infer<typeof registerSchema>;
