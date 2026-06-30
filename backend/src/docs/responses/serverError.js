module.exports = {
  description: "Erro interno no servidor",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: { type: "string", example: "Erro interno no servidor" }
        }
      }
    }
  }
};
