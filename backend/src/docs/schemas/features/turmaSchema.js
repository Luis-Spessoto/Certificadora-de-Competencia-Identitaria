module.exports = {
  Turma: {
    type: "object",
    properties: {
      _id: { type: "string" },
      nome: { type: "string" },
      oficinaId: { $ref: "#/components/schemas/Oficina" },
      alunos: {
        type: "array",
        items: { $ref: "#/components/schemas/Aluno" }
      }
    }
  },
  TurmaInput: {
    type: "object",
    required: ["nome", "oficinaId"],
    properties: {
      nome: { type: "string" },
      oficinaId: { type: "string" },
      alunos: {
        type: "array",
        items: { type: "string" }
      }
    }
  }
};
