// Mock REST adapter — persiste em localStorage. Usado enquanto o backend
// (Bruno) não está disponível. Para desligar: defina VITE_USE_MOCK=false.
import type { AuthResponse, Tutor, TutorInput } from "@/types/tutor";
import type { Oficina } from "@/types/oficina";

const TUTORES_KEY = "ellp.mock.tutores";
const OFICINAS_KEY = "ellp.mock.oficinas";
const PASS_KEY = "ellp.mock.passwords";

export function isMockEnabled() {
  if (typeof window === "undefined") return true;
  return import.meta.env.VITE_USE_MOCK !== "false";
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function now() {
  return new Date().toISOString();
}

function readTutores(): Tutor[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(TUTORES_KEY);
  if (raw) return JSON.parse(raw);
  // seed inicial: admin padrão
  const seed: Tutor[] = [
    {
      id: "admin-seed",
      nome: "Coordenador ELLP",
      email: "admin@ellp.utfpr.edu.br",
      telefone: "",
      curso: "Coordenação",
      matricula: "ADMIN001",
      role: "admin",
      status: "ativo",
      oficinasIds: [],
      criadoEm: now(),
      atualizadoEm: now(),
    },
    {
      id: "tutor-seed",
      nome: "João Vitor Furquim",
      email: "tutor@ellp.utfpr.edu.br",
      telefone: "(43) 99999-0000",
      curso: "Análise e Desenvolvimento de Sistemas",
      matricula: "20231001",
      role: "tutor",
      status: "ativo",
      oficinasIds: ["of-1"],
      criadoEm: now(),
      atualizadoEm: now(),
    },
  ];
  localStorage.setItem(TUTORES_KEY, JSON.stringify(seed));
  const passwords: Record<string, string> = {
    "admin@ellp.utfpr.edu.br": "admin123",
    "tutor@ellp.utfpr.edu.br": "tutor123",
  };
  localStorage.setItem(PASS_KEY, JSON.stringify(passwords));
  return seed;
}

function writeTutores(list: Tutor[]) {
  localStorage.setItem(TUTORES_KEY, JSON.stringify(list));
}

function readPasswords(): Record<string, string> {
  const raw = localStorage.getItem(PASS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writePasswords(p: Record<string, string>) {
  localStorage.setItem(PASS_KEY, JSON.stringify(p));
}

function readOficinas(): Oficina[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(OFICINAS_KEY);
  if (raw) return JSON.parse(raw);
  const seed: Oficina[] = [
    { id: "of-1", titulo: "Lógica com Scratch", descricao: "Introdução à lógica usando Scratch.", tutorId: "tutor-seed", status: "ativa" },
    { id: "of-2", titulo: "Robótica Educacional", descricao: "Montagem e programação de kits.", status: "aprovada" },
  ];
  localStorage.setItem(OFICINAS_KEY, JSON.stringify(seed));
  return seed;
}

function tokenFor(tutor: Tutor) {
  return `mock.${tutor.id}.${btoa(tutor.email)}`;
}

function userFromToken(token: string | null) {
  if (!token) return null;
  const [prefix, id] = token.split(".");
  if (prefix !== "mock") return null;
  return readTutores().find((t) => t.id === id) ?? null;
}

function ok<T>(data: T): T {
  return data;
}

function fail(status: number, message: string): never {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  throw err;
}

// Pattern matching simples para as rotas REST
export async function handleMockRequest<T>(
  path: string,
  method: string,
  body: unknown,
  token: string | null,
): Promise<T> {
  // delay artificial pequeno para simular rede
  await new Promise((r) => setTimeout(r, 120));

  const url = new URL(path, "http://mock.local");
  const p = url.pathname;

  // ---------- AUTH ----------
  if (p === "/auth/login" && method === "POST") {
    const { email, senha } = body as { email: string; senha: string };
    const tutor = readTutores().find((t) => t.email.toLowerCase() === email.toLowerCase());
    const passwords = readPasswords();
    if (!tutor || passwords[email.toLowerCase()] !== senha) fail(401, "Credenciais inválidas");
    if (tutor!.status === "pendente") fail(403, "Cadastro pendente de aprovação");
    if (tutor!.status === "inativo") fail(403, "Tutor inativo");
    const resp: AuthResponse = {
      token: tokenFor(tutor!),
      user: { id: tutor!.id, nome: tutor!.nome, email: tutor!.email, role: tutor!.role, status: tutor!.status },
    };
    return ok(resp) as T;
  }

  if (p === "/auth/register" && method === "POST") {
    const data = body as TutorInput & { senha: string };
    const list = readTutores();
    if (list.some((t) => t.email.toLowerCase() === data.email.toLowerCase())) {
      fail(409, "E-mail já cadastrado");
    }
    const tutor: Tutor = {
      id: uid(),
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      curso: data.curso,
      matricula: data.matricula,
      role: "tutor",
      status: "pendente",
      oficinasIds: [],
      criadoEm: now(),
      atualizadoEm: now(),
    };
    writeTutores([...list, tutor]);
    const passwords = readPasswords();
    passwords[data.email.toLowerCase()] = data.senha;
    writePasswords(passwords);
    return ok(tutor) as T;
  }

  if (p === "/auth/me" && method === "GET") {
    const u = userFromToken(token);
    if (!u) fail(401, "Não autenticado");
    return ok({ id: u!.id, nome: u!.nome, email: u!.email, role: u!.role, status: u!.status }) as T;
  }

  // ---------- TUTORES ----------
  if (p === "/tutores" && method === "GET") {
    return ok(readTutores()) as T;
  }

  if (p === "/tutores" && method === "POST") {
    const data = body as TutorInput;
    const list = readTutores();
    if (list.some((t) => t.email.toLowerCase() === data.email.toLowerCase())) {
      fail(409, "E-mail já cadastrado");
    }
    const tutor: Tutor = {
      id: uid(),
      ...data,
      role: data.role ?? "tutor",
      status: data.status ?? "ativo",
      oficinasIds: [],
      criadoEm: now(),
      atualizadoEm: now(),
    };
    writeTutores([...list, tutor]);
    return ok(tutor) as T;
  }

  const matchTutorId = p.match(/^\/tutores\/([^/]+)$/);
  if (matchTutorId) {
    const id = matchTutorId[1];
    const list = readTutores();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) fail(404, "Tutor não encontrado");
    if (method === "GET") return ok(list[idx]) as T;
    if (method === "PUT") {
      const updated: Tutor = { ...list[idx], ...(body as Partial<Tutor>), id, atualizadoEm: now() };
      list[idx] = updated;
      writeTutores(list);
      return ok(updated) as T;
    }
    if (method === "DELETE") {
      list.splice(idx, 1);
      writeTutores(list);
      return ok(undefined) as T;
    }
  }

  const matchStatus = p.match(/^\/tutores\/([^/]+)\/status$/);
  if (matchStatus && method === "PATCH") {
    const id = matchStatus[1];
    const { status } = body as { status: Tutor["status"] };
    const list = readTutores();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) fail(404, "Tutor não encontrado");
    list[idx] = { ...list[idx], status, atualizadoEm: now() };
    writeTutores(list);
    return ok(list[idx]) as T;
  }

  const matchOficinas = p.match(/^\/tutores\/([^/]+)\/oficinas$/);
  if (matchOficinas && method === "GET") {
    const id = matchOficinas[1];
    const tutor = readTutores().find((t) => t.id === id);
    if (!tutor) fail(404, "Tutor não encontrado");
    const oficinas = readOficinas().filter((o) => tutor!.oficinasIds.includes(o.id) || o.tutorId === id);
    return ok(oficinas) as T;
  }

  // ---------- OFICINAS (placeholder; Danilo substitui) ----------
  if (p === "/oficinas" && method === "GET") {
    return ok(readOficinas()) as T;
  }

  fail(404, `Rota mock não implementada: ${method} ${p}`);
}
