import { api } from "../../api/client";
import type {
  LoginFormFields,
  RegisterFormFields,
} from "../../schemas/auth.schema";

export async function createUser(data: RegisterFormFields) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function loginUser(data: LoginFormFields) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function logoutUser() {
  await api.post("/auth/logout");
}

export async function getMe(signal: AbortSignal) {
  const res = await api.get("/auth/me", { signal });
  return res.data;
}
