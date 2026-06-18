// Extensão do mockAdapter para o módulo de Alunos e Turmas (Pedro — RF03).
// Cole este conteúdo dentro do handleMockRequest em mockAdapter.ts,
// logo antes do fail(404, ...) final.
//
// Ou use o mockAdapterAlunos importado em mockAdapter.ts e chame-o como fallback:
//   return handleMockAlunosRequest<T>(path, method, body, token);

import type { Aluno, AlunoInput, Turma, TurmaInput } from "@/types/aluno";

const ALUNOS_KEY = "ellp.mock.alunos";
const TURMAS_KEY = "ellp.mock.turmas";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function now() {
  return new Date().toISOString();
}

function readAlunos(): Aluno[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ALUNOS_KEY);
  if (raw) return JSON.parse(raw);
  const seed: Aluno[] = [
    {
      id: "aluno-1",
      nome: "Maria Souza",
      email: "maria@escola.edu.br",
      escola: "E.E. Prof. Alcides",
      serie: "8º ano",
      responsavel: "Ana Souza",
      telefoneResponsavel: "(43) 99000-0001",
      status: "ativo",
      turmasIds: ["turma-1"],
      criadoEm: now(),
      atualizadoEm: now(),
    },
    {
      id: "aluno-2",
      nome: "Carlos Lima",
      email: "",
      escola: "ONG Aprender",
      serie: "7º ano",
      responsavel: "José Lima",
      telefoneResponsavel: "(43) 99000-0002",
      status: "ativo",
      turmasIds: ["turma-1"],
      criadoEm: now(),
      atualizadoEm: now(),
    },
  ];
  localStorage.setItem(ALUNOS_KEY, JSON.stringify(seed));
  return seed;
}

function writeAlunos(list: Aluno[]) {
  localStorage.setItem(ALUNOS_KEY, JSON.stringify(list));
}

function readTurmas(): Turma[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(TURMAS_KEY);
  if (raw) return JSON.parse(raw);
  const seed: Turma[] = [
    {
      id: "turma-1",
      nome: "Turma A — Lógica com Scratch",
      oficinaId: "of-1",
      tutorId: "tutor-seed",
      horario: "Sábado 09:00–11:00",
      local: "Lab. Informática UTFPR",
      vagas: 20,
      alunosIds: ["aluno-1", "aluno-2"],
      criadoEm: now(),
      atualizadoEm: now(),
    },
    {
      id: "turma-2",
      nome: "Turma B — Robótica",
      oficinaId: "of-2",
      horario: "Sábado 14:00–16:00",
      local: "Lab. Robótica UTFPR",
      vagas: 15,
      alunosIds: [],
      criadoEm: now(),
      atualizadoEm: now(),
    },
  ];
  localStorage.setItem(TURMAS_KEY, JSON.stringify(seed));
  return seed;
}

function writeTurmas(list: Turma[]) {
  localStorage.setItem(TURMAS_KEY, JSON.stringify(list));
}

function ok<T>(data: T): T {
  return data;
}

function fail(status: number, message: string): never {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  throw err;
}

export async function handleMockAlunosRequest<T>(
  path: string,
  method: string,
  body: unknown,
): Promise<T> {
  const url = new URL(path, "http://mock.local");
  const p = url.pathname;

  // ---------- ALUNOS ----------
  if (p === "/alunos" && method === "GET") {
    return ok(readAlunos()) as T;
  }

  if (p === "/alunos" && method === "POST") {
    const data = body as AlunoInput;
    const list = readAlunos();
    const aluno: Aluno = {
      id: uid(),
      nome: data.nome,
      email: data.email ?? "",
      escola: data.escola,
      serie: data.serie,
      responsavel: data.responsavel,
      telefoneResponsavel: data.telefoneResponsavel,
      status: data.status ?? "ativo",
      turmasIds: [],
      criadoEm: now(),
      atualizadoEm: now(),
    };
    writeAlunos([...list, aluno]);
    return ok(aluno) as T;
  }

  const matchAlunoId = p.match(/^\/alunos\/([^/]+)$/);
  if (matchAlunoId) {
    const id = matchAlunoId[1];
    const list = readAlunos();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) fail(404, "Aluno não encontrado");
    if (method === "GET") return ok(list[idx]) as T;
    if (method === "PUT") {
      const updated: Aluno = { ...list[idx], ...(body as Partial<Aluno>), id, atualizadoEm: now() };
      list[idx] = updated;
      writeAlunos(list);
      return ok(updated) as T;
    }
    if (method === "DELETE") {
      list.splice(idx, 1);
      writeAlunos(list);
      return ok(undefined) as T;
    }
  }

  const matchAlunoStatus = p.match(/^\/alunos\/([^/]+)\/status$/);
  if (matchAlunoStatus && method === "PATCH") {
    const id = matchAlunoStatus[1];
    const { status } = body as { status: Aluno["status"] };
    const list = readAlunos();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) fail(404, "Aluno não encontrado");
    list[idx] = { ...list[idx], status, atualizadoEm: now() };
    writeAlunos(list);
    return ok(list[idx]) as T;
  }

  const matchAlunoTurmas = p.match(/^\/alunos\/([^/]+)\/turmas$/);
  if (matchAlunoTurmas && method === "GET") {
    const id = matchAlunoTurmas[1];
    const aluno = readAlunos().find((a) => a.id === id);
    if (!aluno) fail(404, "Aluno não encontrado");
    const turmas = readTurmas().filter((t) => aluno!.turmasIds.includes(t.id));
    return ok(turmas) as T;
  }

  // ---------- TURMAS ----------
  if (p === "/turmas" && method === "GET") {
    return ok(readTurmas()) as T;
  }

  if (p === "/turmas" && method === "POST") {
    const data = body as TurmaInput;
    const turma: Turma = {
      id: uid(),
      ...data,
      alunosIds: [],
      criadoEm: now(),
      atualizadoEm: now(),
    };
    writeTurmas([...readTurmas(), turma]);
    return ok(turma) as T;
  }

  const matchTurmaId = p.match(/^\/turmas\/([^/]+)$/);
  if (matchTurmaId) {
    const id = matchTurmaId[1];
    const list = readTurmas();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) fail(404, "Turma não encontrada");
    if (method === "GET") return ok(list[idx]) as T;
    if (method === "PUT") {
      const updated: Turma = { ...list[idx], ...(body as Partial<Turma>), id, atualizadoEm: now() };
      list[idx] = updated;
      writeTurmas(list);
      return ok(updated) as T;
    }
    if (method === "DELETE") {
      list.splice(idx, 1);
      writeTurmas(list);
      return ok(undefined) as T;
    }
  }

  const matchTurmaAlunos = p.match(/^\/turmas\/([^/]+)\/alunos$/);
  if (matchTurmaAlunos && method === "GET") {
    const id = matchTurmaAlunos[1];
    const turma = readTurmas().find((t) => t.id === id);
    if (!turma) fail(404, "Turma não encontrada");
    const alunos = readAlunos().filter((a) => turma!.alunosIds.includes(a.id));
    return ok(alunos) as T;
  }

  const matchEnturmar = p.match(/^\/turmas\/([^/]+)\/alunos\/([^/]+)$/);
  if (matchEnturmar) {
    const [, turmaId, alunoId] = matchEnturmar;
    const turmas = readTurmas();
    const alunos = readAlunos();
    const tIdx = turmas.findIndex((t) => t.id === turmaId);
    const aIdx = alunos.findIndex((a) => a.id === alunoId);
    if (tIdx === -1) fail(404, "Turma não encontrada");
    if (aIdx === -1) fail(404, "Aluno não encontrado");

    if (method === "POST") {
      if (turmas[tIdx].alunosIds.includes(alunoId)) fail(409, "Aluno já enturmado");
      if (turmas[tIdx].alunosIds.length >= turmas[tIdx].vagas) fail(409, "Turma sem vagas");
      turmas[tIdx] = {
        ...turmas[tIdx],
        alunosIds: [...turmas[tIdx].alunosIds, alunoId],
        atualizadoEm: now(),
      };
      alunos[aIdx] = {
        ...alunos[aIdx],
        turmasIds: [...alunos[aIdx].turmasIds, turmaId],
        atualizadoEm: now(),
      };
      writeTurmas(turmas);
      writeAlunos(alunos);
      return ok(turmas[tIdx]) as T;
    }

    if (method === "DELETE") {
      turmas[tIdx] = {
        ...turmas[tIdx],
        alunosIds: turmas[tIdx].alunosIds.filter((id) => id !== alunoId),
        atualizadoEm: now(),
      };
      alunos[aIdx] = {
        ...alunos[aIdx],
        turmasIds: alunos[aIdx].turmasIds.filter((id) => id !== turmaId),
        atualizadoEm: now(),
      };
      writeTurmas(turmas);
      writeAlunos(alunos);
      return ok(turmas[tIdx]) as T;
    }
  }

  fail(404, `Rota mock não implementada: ${method} ${p}`);
}
