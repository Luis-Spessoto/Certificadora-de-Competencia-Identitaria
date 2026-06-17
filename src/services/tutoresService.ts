import { apiRequest } from "./apiClient";
import type { Tutor, TutorInput, TutorStatus } from "@/types/tutor";
import type { Oficina } from "@/types/oficina";

export const tutoresService = {
  list: () => apiRequest<Tutor[]>("/tutores"),
  get: (id: string) => apiRequest<Tutor>(`/tutores/${id}`),
  create: (data: TutorInput) => apiRequest<Tutor>("/tutores", { method: "POST", body: data }),
  update: (id: string, data: Partial<TutorInput>) =>
    apiRequest<Tutor>(`/tutores/${id}`, { method: "PUT", body: data }),
  setStatus: (id: string, status: TutorStatus) =>
    apiRequest<Tutor>(`/tutores/${id}/status`, { method: "PATCH", body: { status } }),
  remove: (id: string) => apiRequest<void>(`/tutores/${id}`, { method: "DELETE" }),
  oficinas: (id: string) => apiRequest<Oficina[]>(`/tutores/${id}/oficinas`),
};
