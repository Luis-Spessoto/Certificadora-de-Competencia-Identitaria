import { apiRequest } from "@/services/apiClient";
import type { Tema } from "../types/tema";

export const temasService = {
  list: async () => {
    const res = await apiRequest<any[]>("/temas");
    return res.map((t) => ({
      id: t._id || t.id,
      titulo: t.titulo,
      descricao: t.descricao,
      aprovado: t.aprovado,
    }));
  },
  get: async (id: string) => {
    const t = await apiRequest<any>(`/temas/${id}`);
    return {
      id: t._id || t.id,
      titulo: t.titulo,
      descricao: t.descricao,
      aprovado: t.aprovado,
    };
  },
  create: async (data: Omit<Tema, "id">) => {
    const t = await apiRequest<any>("/temas", { method: "POST", body: data });
    return {
      id: t._id || t.id,
      titulo: t.titulo,
      descricao: t.descricao,
      aprovado: t.aprovado,
    };
  },
  update: async (id: string, data: Partial<Tema>) => {
    const t = await apiRequest<any>(`/temas/${id}`, { method: "PUT", body: data });
    return {
      id: t._id || t.id,
      titulo: t.titulo,
      descricao: t.descricao,
      aprovado: t.aprovado,
    };
  },
  remove: (id: string) => apiRequest<void>(`/temas/${id}`, { method: "DELETE" }),
};
