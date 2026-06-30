import { apiRequest } from "@/services/apiClient";
import type { Aluno, AlunoInput, AlunoStatus, Turma, TurmaInput } from "../types/aluno";

const mapAluno = (a: any): Aluno => ({
  id: a._id || a.id,
  nome: a.nome,
  escola: a.escola,
  email: a.email || "",
  serie: a.serie || "8º ano",
  responsavel: a.responsavel || "",
  telefoneResponsavel: a.telefoneResponsavel || "",
  status: a.status || "ativo",
  turmasIds: a.turmasIds || [],
  criadoEm: a.createdAt || a.criadoEm || new Date().toISOString(),
  atualizadoEm: a.updatedAt || a.atualizadoEm || new Date().toISOString(),
});

const mapTurma = (t: any): Turma => {
  const oficina = t.oficinaId || {};
  return {
    id: t._id || t.id,
    nome: t.nome,
    oficinaId: typeof t.oficinaId === "object" ? t.oficinaId?._id || t.oficinaId?.id : t.oficinaId,
    tutorId: oficina.tutorId?._id || oficina.tutorId?.id || oficina.tutorId || "",
    horario: oficina.horario || "Sábado 09:00–11:00",
    local: oficina.local || "Lab. Informática UTFPR",
    vagas: t.vagas || 20,
    alunosIds: (t.alunos || []).map((a: any) => a._id || a.id || a),
    criadoEm: t.createdAt || t.criadoEm || new Date().toISOString(),
    atualizadoEm: t.updatedAt || t.atualizadoEm || new Date().toISOString(),
  };
};

export const alunosService = {
  list: async () => {
    const res = await apiRequest<any[]>("/alunos");
    return res.map(mapAluno);
  },
  get: async (id: string) => {
    const res = await apiRequest<any>(`/alunos/${id}`);
    return mapAluno(res);
  },
  create: async (data: AlunoInput) => {
    const payload = {
      nome: data.nome,
      escola: data.escola,
      idade: 12,
    };
    const res = await apiRequest<any>("/alunos", { method: "POST", body: payload });
    return mapAluno(res);
  },
  update: async (id: string, data: Partial<AlunoInput>) => {
    const payload = {
      nome: data.nome,
      escola: data.escola,
      idade: 12,
    };
    const res = await apiRequest<any>(`/alunos/${id}`, { method: "PUT", body: payload });
    return mapAluno(res);
  },
  setStatus: async (id: string, status: AlunoStatus) => {
    const res = await apiRequest<any>(`/alunos/${id}`, { method: "PUT", body: { status } });
    return mapAluno(res);
  },
  remove: (id: string) => apiRequest<void>(`/alunos/${id}`, { method: "DELETE" }),
  turmas: async (id: string) => {
    const res = await apiRequest<any[]>("/turmas");
    const mapped = res.map(mapTurma);
    return mapped.filter((t) => t.alunosIds.includes(id));
  },
};

export const turmasService = {
  list: async () => {
    const res = await apiRequest<any[]>("/turmas");
    return res.map(mapTurma);
  },
  get: async (id: string) => {
    const res = await apiRequest<any>(`/turmas/${id}`);
    return mapTurma(res);
  },
  create: async (data: TurmaInput) => {
    const payload = {
      nome: data.nome,
      oficinaId: data.oficinaId,
      alunos: [],
    };
    const res = await apiRequest<any>("/turmas", { method: "POST", body: payload });
    return mapTurma(res);
  },
  update: async (id: string, data: Partial<TurmaInput>) => {
    const payload = {
      nome: data.nome,
      oficinaId: data.oficinaId,
    };
    const res = await apiRequest<any>(`/turmas/${id}`, { method: "PUT", body: payload });
    return mapTurma(res);
  },
  remove: (id: string) => apiRequest<void>(`/turmas/${id}`, { method: "DELETE" }),
  alunos: async (id: string) => {
    const res = await apiRequest<any>(`/turmas/${id}`);
    return (res.alunos || []).map(mapAluno);
  },
  addAluno: async (turmaId: string, alunoId: string) => {
    const t = await apiRequest<any>(`/turmas/${turmaId}`);
    const currentIds = (t.alunos || []).map((a: any) => a._id || a.id || a);
    if (!currentIds.includes(alunoId)) {
      const res = await apiRequest<any>(`/turmas/${turmaId}`, {
        method: "PUT",
        body: { alunos: [...currentIds, alunoId] },
      });
      return mapTurma(res);
    }
    return mapTurma(t);
  },
  removeAluno: async (turmaId: string, alunoId: string) => {
    const t = await apiRequest<any>(`/turmas/${turmaId}`);
    const currentIds = (t.alunos || []).map((a: any) => a._id || a.id || a);
    const res = await apiRequest<any>(`/turmas/${turmaId}`, {
      method: "PUT",
      body: { alunos: currentIds.filter((id: string) => id !== alunoId) },
    });
    return mapTurma(res);
  },
};
