export interface Professor {
  id: string;
  nome: string;
  email: string;
  oficinas?: any[];
}

export type ProfessorInput = Omit<Professor, "id" | "oficinas">;
