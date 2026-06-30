import { apiRequest, setToken } from "./apiClient";
import type { AuthResponse, AuthUser, TutorInput } from "@/modules/tutores/types/tutor";

export async function login(email: string, senha: string): Promise<AuthResponse> {
  const resp = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: { email, senha },
  });
  setToken(resp.token);
  return resp;
}

export async function register(data: TutorInput & { senha: string }) {
  return apiRequest("/auth/register", { method: "POST", body: data });
}

export async function me(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me");
}

export function logout() {
  setToken(null);
}
