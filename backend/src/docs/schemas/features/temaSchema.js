module.exports = {
  Tema: {
    type: "object",
    properties: {
      _id: { type: "string" },
      titulo: { type: "string" },
      descricao: { type: "string" },
      aprovado: { type: "boolean" }
    }
  },
  TemaInput: {
    type: "object",
    required: ["titulo", "descricao"],
    properties: {
      titulo: { type: "string" },
      descricao: { type: "string" },
      aprovado: { type: "boolean" }
    }
  }
};
