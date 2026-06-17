// ─── Tipos do Módulo de Temas e Curadoria ────────────────────────────────────
// Danilo Augusto

export type TemaStatus = "rascunho" | "publicado" | "arquivado";

export type NivelTema = "basico" | "intermediario" | "avancado";

/** Material de apoio anexado a um tema */
export interface MaterialApoio {
  id: string;
  nome: string;
  /** URL gerada após upload (base64 no mock / URL real na API) */
  url: string;
  tipo: "pdf" | "imagem" | "video" | "link" | "outro";
  tamanhoBytes?: number;
  adicionadoEm: string;
}

/** Entidade principal: Tema de Oficina */
export interface Tema {
  id: string;
  titulo: string;
  /** Descrição pedagógica — objetivos, metodologia, público-alvo */
  descricaoPedagogica: string;
  /** Tecnologias / ferramentas utilizadas na oficina */
  tecnologias: string[];
  nivel: NivelTema;
  status: TemaStatus;
  materiaisApoio: MaterialApoio[];
  criadoEm: string;
  atualizadoEm: string;
}

/** Dados de entrada para criar/editar um tema */
export type TemaInput = Omit<Tema, "id" | "criadoEm" | "atualizadoEm">;
