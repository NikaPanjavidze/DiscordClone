import * as z from "zod";

export const friendInvitationSchema = z.object({
  body: z.object({
    targetEmail: z
      .string({ message: "Target email is required." })
      .email("Please enter a valid email address."),
  }),
});
