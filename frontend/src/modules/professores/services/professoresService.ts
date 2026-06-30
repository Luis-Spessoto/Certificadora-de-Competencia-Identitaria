import { apiRequest } from "@/services/apiClient";
import type { Professor } from "../types/professor";

export const professoresService = {
  list: async () => {
    const res = await apiRequest<any[]>("/professores");
    return res.map((p) => ({
      id: p._id || p.id,
      nome: p.nome,
      email: p.email,
    }));
  },
  get: async (id: string) => {
    const p = await apiRequest<any>(`/professores/${id}`);
    return {
      id: p._id || p.id,
      nome: p.nome,
      email: p.email,
    };
  },
  create: async (data: Omit<Professor, "id"> & { senha?: string }) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      senha: data.senha || "professor123",
    };
    const p = await apiRequest<any>("/professores", { method: "POST", body: payload });
    return {
      id: p._id || p.id,
      nome: p.nome,
      email: p.email,
    };
  },
  update: async (id: string, data: Partial<Professor> & { senha?: string }) => {
    const p = await apiRequest<any>(`/professores/${id}`, { method: "PUT", body: data });
    return {
      id: p._id || p.id,
      nome: p.nome,
      email: p.email,
    };
  },
  remove: (id: string) => apiRequest<void>(`/professores/${id}`, { method: "DELETE" }),
};
