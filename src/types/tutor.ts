// Contrato compartilhado de Tutor — usado pelo frontend e referência para o backend (Bruno).
export type TutorRole = "admin" | "tutor";
export type TutorStatus = "pendente" | "ativo" | "inativo";

export interface Tutor {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  curso: string;
  matricula: string;
  role: TutorRole;
  status: TutorStatus;
  oficinasIds: string[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface TutorInput {
  nome: string;
  email: string;
  telefone?: string;
  curso: string;
  matricula: string;
  role?: TutorRole;
  status?: TutorStatus;
}

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  role: TutorRole;
  status: TutorStatus;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
