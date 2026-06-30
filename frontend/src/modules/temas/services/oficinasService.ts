import { apiRequest } from "@/services/apiClient";
import type { Oficina } from "../types/oficina";

export const oficinasService = {
  list: async () => {
    const res = await apiRequest<any[]>("/oficinas");
    return res.map((o) => ({
      id: o._id || o.id,
      nome: o.nome || o.titulo || "",
      temaId: o.temaId || "",
      tutorId: o.tutorId || "",
      professorId: o.professorId || "",
      data: o.data || "",
      horario: o.horario || "",
      local: o.local || "",
    }));
  },
};
