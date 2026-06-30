module.exports = {
  description: "Requisição inválida (dados incorretos ou ausentes)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: { type: "string", example: "Dados obrigatórios inválidos ou ausentes" }
        }
      }
    }
  }
};
