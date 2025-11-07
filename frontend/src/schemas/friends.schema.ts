import { z } from "zod";

export const inviteSchema = z.object({
  targetEmail: z
    .string({ message: "Email is required." })
    .email("Please enter a valid email address."),
});

export type InviteFormFields = z.infer<typeof inviteSchema>;
