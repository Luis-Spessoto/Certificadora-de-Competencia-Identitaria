// Contrato esperado para Oficinas (será implementado pelo módulo do Danilo).
export interface Oficina {
  id: string;
  titulo: string;
  descricao?: string;
  tutorId?: string;
  status?: "rascunho" | "aprovada" | "ativa" | "concluida";
}
