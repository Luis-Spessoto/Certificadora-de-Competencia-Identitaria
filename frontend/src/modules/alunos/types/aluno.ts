export type AlunoStatus = "ativo" | "inativo";

export interface Aluno {
  id: string;
  nome: string;
  email?: string;
  escola: string;
  serie: string;
  responsavel?: string;
  telefoneResponsavel?: string;
  status: AlunoStatus;
  turmasIds: string[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface AlunoInput {
  nome: string;
  email?: string;
  escola: string;
  serie: string;
  responsavel?: string;
  telefoneResponsavel?: string;
  status?: AlunoStatus;
}

export interface Turma {
  id: string;
  nome: string;
  oficinaId: string;
  tutorId?: string;
  horario: string;
  local: string;
  vagas: number;
  alunosIds: string[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface TurmaInput {
  nome: string;
  oficinaId: string;
  tutorId?: string;
  horario: string;
  local: string;
  vagas: number;
}
