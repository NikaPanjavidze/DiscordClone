import { api } from "../../api/client";
import type { InviteFormFields } from "../../schemas/friends.schema";

export async function inviteUser(data: InviteFormFields) {
  const res = await api.post("/friends", data);
  return res.data;
}

export async function rejectInvite(id: string) {
  const res = await api.delete(`/friends/${id}`);
  return res.data;
}

export async function acceptInvite(id: string) {
  const res = await api.post(`/friends/${id}`);
  return res.data;
}
