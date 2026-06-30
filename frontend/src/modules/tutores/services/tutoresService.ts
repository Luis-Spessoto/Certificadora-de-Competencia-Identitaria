import { apiRequest } from "@/services/apiClient";
import type { Tutor, TutorInput, TutorStatus } from "../types/tutor";
import type { Oficina } from "../../temas/types/oficina";

const mapTutor = (t: any): Tutor => {
  const id = t._id || t.id;
  return {
    id,
    nome: t.nome,
    email: t.email,
    telefone: t.telefone || "(43) 99999-0000",
    curso: t.curso,
    matricula: t.matricula || "20231001",
    role: t.role || "tutor",
    status: t.status || "ativo",
    oficinasIds: t.oficinasIds || [],
    criadoEm: t.createdAt || t.criadoEm || new Date().toISOString(),
    atualizadoEm: t.updatedAt || t.atualizadoEm || new Date().toISOString(),
  };
};

export const tutoresService = {
  list: async () => {
    const res = await apiRequest<any[]>("/tutores");
    return res.map(mapTutor);
  },
  get: async (id: string) => {
    const res = await apiRequest<any>(`/tutores/${id}`);
    return mapTutor(res);
  },
  create: async (data: TutorInput & { senha?: string }) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      curso: data.curso,
      periodo: "1º período",
      senha: data.senha || "tutor123",
      role: data.role || "tutor",
      status: data.status || "pendente",
    };
    const res = await apiRequest<any>("/tutores", { method: "POST", body: payload });
    return mapTutor(res);
  },
  update: async (id: string, data: Partial<TutorInput>) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      curso: data.curso,
      periodo: "1º período",
      role: data.role,
      status: data.status,
    };
    const res = await apiRequest<any>(`/tutores/${id}`, { method: "PUT", body: payload });
    return mapTutor(res);
  },
  setStatus: async (id: string, status: TutorStatus) => {
    const res = await apiRequest<any>(`/tutores/${id}`, { method: "PUT", body: { status } });
    return mapTutor(res);
  },
  remove: (id: string) => apiRequest<void>(`/tutores/${id}`, { method: "DELETE" }),
  oficinas: async (id: string) => {
    const res = await apiRequest<any[]>("/oficinas");
    return res.filter((o) => o.tutorId === id);
  },
};
