module.exports = {
  Professor: {
    type: "object",
    properties: {
      _id: { type: "string" },
      nome: { type: "string" },
      email: { type: "string" }
    }
  },
  ProfessorInput: {
    type: "object",
    required: ["nome", "email", "senha"],
    properties: {
      nome: { type: "string" },
      email: { type: "string" },
      senha: { type: "string" }
    }
  }
};
