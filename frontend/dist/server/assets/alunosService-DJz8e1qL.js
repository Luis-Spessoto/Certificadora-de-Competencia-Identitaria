import { c as apiRequest } from "./router-X-RD508Q.js";
const mapAluno = (a) => ({
  id: a._id || a.id,
  nome: a.nome,
  escola: a.escola,
  email: a.email || "",
  serie: a.serie || "8º ano",
  responsavel: a.responsavel || "",
  telefoneResponsavel: a.telefoneResponsavel || "",
  status: a.status || "ativo",
  turmasIds: a.turmasIds || [],
  criadoEm: a.createdAt || a.criadoEm || (/* @__PURE__ */ new Date()).toISOString(),
  atualizadoEm: a.updatedAt || a.atualizadoEm || (/* @__PURE__ */ new Date()).toISOString()
});
const mapTurma = (t) => {
  const oficina = t.oficinaId || {};
  return {
    id: t._id || t.id,
    nome: t.nome,
    oficinaId: typeof t.oficinaId === "object" ? t.oficinaId?._id || t.oficinaId?.id : t.oficinaId,
    tutorId: oficina.tutorId?._id || oficina.tutorId?.id || oficina.tutorId || "",
    horario: oficina.horario || "Sábado 09:00–11:00",
    local: oficina.local || "Lab. Informática UTFPR",
    vagas: t.vagas || 20,
    alunosIds: (t.alunos || []).map((a) => a._id || a.id || a),
    criadoEm: t.createdAt || t.criadoEm || (/* @__PURE__ */ new Date()).toISOString(),
    atualizadoEm: t.updatedAt || t.atualizadoEm || (/* @__PURE__ */ new Date()).toISOString()
  };
};
const alunosService = {
  list: async () => {
    const res = await apiRequest("/alunos");
    return res.map(mapAluno);
  },
  get: async (id) => {
    const res = await apiRequest(`/alunos/${id}`);
    return mapAluno(res);
  },
  create: async (data) => {
    const payload = {
      nome: data.nome,
      escola: data.escola,
      idade: 12
    };
    const res = await apiRequest("/alunos", { method: "POST", body: payload });
    return mapAluno(res);
  },
  update: async (id, data) => {
    const payload = {
      nome: data.nome,
      escola: data.escola,
      idade: 12
    };
    const res = await apiRequest(`/alunos/${id}`, { method: "PUT", body: payload });
    return mapAluno(res);
  },
  setStatus: async (id, status) => {
    const res = await apiRequest(`/alunos/${id}`, { method: "PUT", body: { status } });
    return mapAluno(res);
  },
  remove: (id) => apiRequest(`/alunos/${id}`, { method: "DELETE" }),
  turmas: async (id) => {
    const res = await apiRequest("/turmas");
    const mapped = res.map(mapTurma);
    return mapped.filter((t) => t.alunosIds.includes(id));
  }
};
const turmasService = {
  list: async () => {
    const res = await apiRequest("/turmas");
    return res.map(mapTurma);
  },
  get: async (id) => {
    const res = await apiRequest(`/turmas/${id}`);
    return mapTurma(res);
  },
  create: async (data) => {
    const payload = {
      nome: data.nome,
      oficinaId: data.oficinaId,
      alunos: []
    };
    const res = await apiRequest("/turmas", { method: "POST", body: payload });
    return mapTurma(res);
  },
  update: async (id, data) => {
    const payload = {
      nome: data.nome,
      oficinaId: data.oficinaId
    };
    const res = await apiRequest(`/turmas/${id}`, { method: "PUT", body: payload });
    return mapTurma(res);
  },
  remove: (id) => apiRequest(`/turmas/${id}`, { method: "DELETE" }),
  alunos: async (id) => {
    const res = await apiRequest(`/turmas/${id}`);
    return (res.alunos || []).map(mapAluno);
  },
  addAluno: async (turmaId, alunoId) => {
    const t = await apiRequest(`/turmas/${turmaId}`);
    const currentIds = (t.alunos || []).map((a) => a._id || a.id || a);
    if (!currentIds.includes(alunoId)) {
      const res = await apiRequest(`/turmas/${turmaId}`, {
        method: "PUT",
        body: { alunos: [...currentIds, alunoId] }
      });
      return mapTurma(res);
    }
    return mapTurma(t);
  },
  removeAluno: async (turmaId, alunoId) => {
    const t = await apiRequest(`/turmas/${turmaId}`);
    const currentIds = (t.alunos || []).map((a) => a._id || a.id || a);
    const res = await apiRequest(`/turmas/${turmaId}`, {
      method: "PUT",
      body: { alunos: currentIds.filter((id) => id !== alunoId) }
    });
    return mapTurma(res);
  }
};
export {
  alunosService as a,
  turmasService as t
};
