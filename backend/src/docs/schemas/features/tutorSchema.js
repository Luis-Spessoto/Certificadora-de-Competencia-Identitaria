module.exports = {
  Tutor: {
    type: "object",
    properties: {
      _id: { type: "string" },
      nome: { type: "string" },
      email: { type: "string" },
      curso: { type: "string" },
      periodo: { type: "string" },
      role: { type: "string" },
      status: { type: "string" }
    }
  },
  TutorInput: {
    type: "object",
    required: ["nome", "email", "curso", "periodo", "senha"],
    properties: {
      nome: { type: "string" },
      email: { type: "string" },
      curso: { type: "string" },
      periodo: { type: "string" },
      senha: { type: "string" },
      role: { type: "string" },
      status: { type: "string" }
    }
  }
};
