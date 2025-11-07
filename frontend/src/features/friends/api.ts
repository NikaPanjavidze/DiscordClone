import { api } from "../../api/client";
import type { InviteFormFields } from "../../schemas/friends.schema";

export async function inviteUser(data: InviteFormFields) {
  const res = await api.post("/friends", data);
  return res.data;
}
