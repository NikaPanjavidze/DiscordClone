import * as z from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ message: "Username is required." })
      .min(3, "Username must be at least 3 characters long.")
      .max(12, "Username cannot exceed 12 characters."),

    password: z
      .string({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters long."),

    email: z
      .string({ message: "Email is required." })
      .email("Please enter a valid email address."),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    password: z
      .string({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters long."),

    email: z
      .string({ message: "Email is required." })
      .email("Please enter a valid email address."),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
