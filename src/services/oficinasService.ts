// Stub — implementação completa fica com o módulo do Danilo (temas/oficinas).
import { apiRequest } from "./apiClient";
import type { Oficina } from "@/types/oficina";

export const oficinasService = {
  list: () => apiRequest<Oficina[]>("/oficinas"),
};
