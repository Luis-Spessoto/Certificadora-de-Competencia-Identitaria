// ─── Rotas Mock — Módulo de Temas e Curadoria ────────────────────────────────
// Cole estas funções/constantes dentro de mockAdapter.ts (Danilo).
// As funções `uid`, `now`, `ok`, `fail` já existem lá; não duplicar.

import type { Tema, TemaInput, MaterialApoio } from "@/types/tema";

const TEMAS_KEY = "ellp.mock.temas";

export function readTemas(): Tema[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(TEMAS_KEY);
  if (raw) return JSON.parse(raw);

  // Seed inicial com exemplos reais do ELLP
  const seed: Tema[] = [
    {
      id: "tema-1",
      titulo: "Lógica de Programação com Scratch",
      descricaoPedagogica:
        "Introdução à lógica computacional através de blocos visuais. " +
        "Os alunos aprendem sequências, condicionais e loops criando animações e jogos simples. " +
        "Indicado para estudantes do ensino fundamental sem experiência prévia com programação.",
      tecnologias: ["Scratch", "Navegador web"],
      nivel: "basico",
      status: "publicado",
      materiaisApoio: [
        {
          id: "mat-1",
          nome: "Roteiro da oficina.pdf",
          url: "#roteiro-scratch",
          tipo: "pdf",
          tamanhoBytes: 524288,
          adicionadoEm: new Date().toISOString(),
        },
      ],
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    },
    {
      id: "tema-2",
      titulo: "Robótica com Arduino",
      descricaoPedagogica:
        "Montagem e programação de circuitos básicos com Arduino Uno. " +
        "Aborda conceitos de eletrônica, lógica digital e automação por meio de projetos práticos " +
        "como sensores de distância e semáforos inteligentes.",
      tecnologias: ["Arduino IDE", "C++", "Protoboard", "Sensores HC-SR04"],
      nivel: "intermediario",
      status: "publicado",
      materiaisApoio: [],
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    },
    {
      id: "tema-3",
      titulo: "Desenvolvimento Web Básico",
      descricaoPedagogica:
        "Introdução ao desenvolvimento front-end com HTML, CSS e JavaScript. " +
        "Os alunos constroem uma página pessoal do zero, compreendendo estrutura, estilo e interatividade.",
      tecnologias: ["HTML5", "CSS3", "JavaScript", "VS Code"],
      nivel: "basico",
      status: "rascunho",
      materiaisApoio: [],
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    },
  ];

  localStorage.setItem(TEMAS_KEY, JSON.stringify(seed));
  return seed;
}

export function writeTemas(list: Tema[]) {
  localStorage.setItem(TEMAS_KEY, JSON.stringify(list));
}

// ─── Bloco que deve ser inserido no switch de `handleMockRequest` ─────────────
// (Adicionar antes do `fail(404, ...)` final)

export function handleTemaRoutes<T>(
  p: string,
  method: string,
  body: unknown,
): T | null {
  // Utilitários locais (idênticos ao mockAdapter original)
  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
  function now() {
    return new Date().toISOString();
  }
  function ok<V>(data: V): V {
    return data;
  }
  function fail(status: number, message: string): never {
    const err = new Error(message) as Error & { status: number };
    err.status = status;
    throw err;
  }

  // GET /temas — lista todos
  if (p === "/temas" && method === "GET") {
    return ok(readTemas()) as T;
  }

  // POST /temas — cria novo tema
  if (p === "/temas" && method === "POST") {
    const data = body as TemaInput;
    if (!data.titulo?.trim()) fail(422, "Título é obrigatório");
    if (!data.descricaoPedagogica?.trim())
      fail(422, "Descrição pedagógica é obrigatória");

    const tema: Tema = {
      id: uid(),
      titulo: data.titulo.trim(),
      descricaoPedagogica: data.descricaoPedagogica.trim(),
      tecnologias: data.tecnologias ?? [],
      nivel: data.nivel ?? "basico",
      status: data.status ?? "rascunho",
      materiaisApoio: data.materiaisApoio ?? [],
      criadoEm: now(),
      atualizadoEm: now(),
    };
    writeTemas([...readTemas(), tema]);
    return ok(tema) as T;
  }

  // GET /temas/:id
  const matchId = p.match(/^\/temas\/([^/]+)$/);
  if (matchId) {
    const id = matchId[1];
    const list = readTemas();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) fail(404, "Tema não encontrado");

    if (method === "GET") return ok(list[idx]) as T;

    if (method === "PUT") {
      const data = body as Partial<TemaInput>;
      const updated: Tema = {
        ...list[idx],
        ...data,
        id,
        atualizadoEm: now(),
      };
      list[idx] = updated;
      writeTemas(list);
      return ok(updated) as T;
    }

    if (method === "DELETE") {
      list.splice(idx, 1);
      writeTemas(list);
      return ok(undefined) as T;
    }
  }

  // PATCH /temas/:id/status
  const matchStatus = p.match(/^\/temas\/([^/]+)\/status$/);
  if (matchStatus && method === "PATCH") {
    const id = matchStatus[1];
    const { status } = body as { status: Tema["status"] };
    const list = readTemas();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) fail(404, "Tema não encontrado");
    list[idx] = { ...list[idx], status, atualizadoEm: now() };
    writeTemas(list);
    return ok(list[idx]) as T;
  }

  // POST /temas/:id/materiais — adiciona material de apoio
  const matchMateriais = p.match(/^\/temas\/([^/]+)\/materiais$/);
  if (matchMateriais && method === "POST") {
    const id = matchMateriais[1];
    const list = readTemas();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) fail(404, "Tema não encontrado");

    const data = body as Omit<MaterialApoio, "id" | "adicionadoEm">;
    const material: MaterialApoio = {
      id: uid(),
      nome: data.nome,
      url: data.url,
      tipo: data.tipo ?? "outro",
      tamanhoBytes: data.tamanhoBytes,
      adicionadoEm: now(),
    };
    list[idx].materiaisApoio = [...list[idx].materiaisApoio, material];
    list[idx].atualizadoEm = now();
    writeTemas(list);
    return ok(material) as T;
  }

  // DELETE /temas/:id/materiais/:materialId
  const matchMaterialId = p.match(/^\/temas\/([^/]+)\/materiais\/([^/]+)$/);
  if (matchMaterialId && method === "DELETE") {
    const [, temaId, materialId] = matchMaterialId;
    const list = readTemas();
    const idx = list.findIndex((t) => t.id === temaId);
    if (idx === -1) fail(404, "Tema não encontrado");
    list[idx].materiaisApoio = list[idx].materiaisApoio.filter(
      (m) => m.id !== materialId,
    );
    list[idx].atualizadoEm = now();
    writeTemas(list);
    return ok(undefined) as T;
  }

  return null; // rota não pertence a este módulo
}
