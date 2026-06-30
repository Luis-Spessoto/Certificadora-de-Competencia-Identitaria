import { c as apiRequest } from "./router-X-RD508Q.js";
const mapTutor = (t) => {
  const id = t._id || t.id;
  return {
    id,
    nome: t.nome,
    email: t.email,
    telefone: t.telefone || "(43) 99999-0000",
    curso: t.curso,
    matricula: t.matricula || "20231001",
    role: t.role || "tutor",
    status: t.status || "ativo",
    oficinasIds: t.oficinasIds || [],
    criadoEm: t.createdAt || t.criadoEm || (/* @__PURE__ */ new Date()).toISOString(),
    atualizadoEm: t.updatedAt || t.atualizadoEm || (/* @__PURE__ */ new Date()).toISOString()
  };
};
const tutoresService = {
  list: async () => {
    const res = await apiRequest("/tutores");
    return res.map(mapTutor);
  },
  get: async (id) => {
    const res = await apiRequest(`/tutores/${id}`);
    return mapTutor(res);
  },
  create: async (data) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      curso: data.curso,
      periodo: "1º período",
      senha: data.senha || "tutor123",
      role: data.role || "tutor",
      status: data.status || "pendente"
    };
    const res = await apiRequest("/tutores", { method: "POST", body: payload });
    return mapTutor(res);
  },
  update: async (id, data) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      curso: data.curso,
      periodo: "1º período",
      role: data.role,
      status: data.status
    };
    const res = await apiRequest(`/tutores/${id}`, { method: "PUT", body: payload });
    return mapTutor(res);
  },
  setStatus: async (id, status) => {
    const res = await apiRequest(`/tutores/${id}`, { method: "PUT", body: { status } });
    return mapTutor(res);
  },
  remove: (id) => apiRequest(`/tutores/${id}`, { method: "DELETE" }),
  oficinas: async (id) => {
    const res = await apiRequest("/oficinas");
    return res.filter((o) => o.tutorId === id);
  }
};
export {
  tutoresService as t
};
