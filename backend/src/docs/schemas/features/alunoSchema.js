module.exports = {
  Aluno: {
    type: "object",
    properties: {
      _id: { type: "string" },
      nome: { type: "string" },
      escola: { type: "string" },
      idade: { type: "integer" }
    }
  },
  AlunoInput: {
    type: "object",
    required: ["nome", "escola", "idade"],
    properties: {
      nome: { type: "string" },
      escola: { type: "string" },
      idade: { type: "integer" }
    }
  }
};
