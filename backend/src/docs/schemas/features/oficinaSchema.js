module.exports = {
  Oficina: {
    type: "object",
    properties: {
      _id: { type: "string" },
      nome: { type: "string" },
      temaId: { $ref: "#/components/schemas/Tema" },
      tutorId: { $ref: "#/components/schemas/Tutor" },
      professorId: { $ref: "#/components/schemas/Professor" },
      data: { type: "string" },
      horario: { type: "string" },
      local: { type: "string" }
    }
  },
  OficinaInput: {
    type: "object",
    required: ["nome", "temaId", "tutorId", "professorId", "data", "horario", "local"],
    properties: {
      nome: { type: "string" },
      temaId: { type: "string" },
      tutorId: { type: "string" },
      professorId: { type: "string" },
      data: { type: "string" },
      horario: { type: "string" },
      local: { type: "string" }
    }
  }
};
