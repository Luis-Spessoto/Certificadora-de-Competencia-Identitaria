// ─── Service: Temas e Curadoria ───────────────────────────────────────────────
// Espelha o padrão de tutoresService.ts (João).
// Danilo Augusto

import { apiRequest } from "./apiClient";
import type { Tema, TemaInput, MaterialApoio } from "@/types/tema";

export const temasService = {
  /** Lista todos os temas */
  list(): Promise<Tema[]> {
    return apiRequest<Tema[]>("/temas");
  },

  /** Busca tema por ID */
  get(id: string): Promise<Tema> {
    return apiRequest<Tema>(`/temas/${id}`);
  },

  /** Cria um novo tema */
  create(data: TemaInput): Promise<Tema> {
    return apiRequest<Tema>("/temas", { method: "POST", body: data });
  },

  /** Atualiza todos os campos de um tema */
  update(id: string, data: Partial<TemaInput>): Promise<Tema> {
    return apiRequest<Tema>(`/temas/${id}`, { method: "PUT", body: data });
  },

  /** Altera apenas o status (rascunho → publicado → arquivado) */
  setStatus(id: string, status: Tema["status"]): Promise<Tema> {
    return apiRequest<Tema>(`/temas/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },

  /** Remove um tema */
  remove(id: string): Promise<void> {
    return apiRequest<void>(`/temas/${id}`, { method: "DELETE" });
  },

  /** Adiciona material de apoio (arquivo ou link) */
  addMaterial(
    temaId: string,
    material: Omit<MaterialApoio, "id" | "adicionadoEm">,
  ): Promise<MaterialApoio> {
    return apiRequest<MaterialApoio>(`/temas/${temaId}/materiais`, {
      method: "POST",
      body: material,
    });
  },

  /** Remove um material de apoio */
  removeMaterial(temaId: string, materialId: string): Promise<void> {
    return apiRequest<void>(`/temas/${temaId}/materiais/${materialId}`, {
      method: "DELETE",
    });
  },
};
