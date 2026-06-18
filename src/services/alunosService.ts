import { apiRequest } from "./apiClient";
import type { Aluno, AlunoInput, AlunoStatus, Turma, TurmaInput } from "@/types/aluno";

export const alunosService = {
  list: () => apiRequest<Aluno[]>("/alunos"),
  get: (id: string) => apiRequest<Aluno>(`/alunos/${id}`),
  create: (data: AlunoInput) => apiRequest<Aluno>("/alunos", { method: "POST", body: data }),
  update: (id: string, data: Partial<AlunoInput>) =>
    apiRequest<Aluno>(`/alunos/${id}`, { method: "PUT", body: data }),
  setStatus: (id: string, status: AlunoStatus) =>
    apiRequest<Aluno>(`/alunos/${id}/status`, { method: "PATCH", body: { status } }),
  remove: (id: string) => apiRequest<void>(`/alunos/${id}`, { method: "DELETE" }),
  turmas: (id: string) => apiRequest<Turma[]>(`/alunos/${id}/turmas`),
};

export const turmasService = {
  list: () => apiRequest<Turma[]>("/turmas"),
  get: (id: string) => apiRequest<Turma>(`/turmas/${id}`),
  create: (data: TurmaInput) => apiRequest<Turma>("/turmas", { method: "POST", body: data }),
  update: (id: string, data: Partial<TurmaInput>) =>
    apiRequest<Turma>(`/turmas/${id}`, { method: "PUT", body: data }),
  remove: (id: string) => apiRequest<void>(`/turmas/${id}`, { method: "DELETE" }),
  alunos: (id: string) => apiRequest<Aluno[]>(`/turmas/${id}/alunos`),
  addAluno: (turmaId: string, alunoId: string) =>
    apiRequest<Turma>(`/turmas/${turmaId}/alunos/${alunoId}`, { method: "POST" }),
  removeAluno: (turmaId: string, alunoId: string) =>
    apiRequest<Turma>(`/turmas/${turmaId}/alunos/${alunoId}`, { method: "DELETE" }),
};
