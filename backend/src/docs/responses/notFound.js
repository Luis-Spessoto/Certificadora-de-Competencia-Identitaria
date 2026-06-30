module.exports = {
  description: "Recurso não encontrado",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: { type: "string", example: "Recurso não encontrado com o id fornecido" }
        }
      }
    }
  }
};
