module.exports = {
  "/api/oficinas": {
    get: {
      tags: ["Oficinas"],
      summary: "Retorna todas as oficinas (populadas)",
      responses: {
        200: {
          description: "Lista de oficinas retornada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Oficina" }
              }
            }
          }
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    post: {
      tags: ["Oficinas"],
      summary: "Agenda uma nova oficina",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OficinaInput" }
          }
        }
      },
      responses: {
        201: {
          description: "Oficina agendada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Oficina" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/oficinas/{id}": {
    get: {
      tags: ["Oficinas"],
      summary: "Retorna uma oficina específica pelo ID (populada)",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Oficina encontrada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Oficina" }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    put: {
      tags: ["Oficinas"],
      summary: "Atualiza dados de agendamento de uma oficina",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OficinaInput" }
          }
        }
      },
      responses: {
        200: {
          description: "Oficina atualizada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Oficina" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    delete: {
      tags: ["Oficinas"],
      summary: "Exclui uma oficina agendada pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Oficina deletada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Oficina excluída com sucesso" }
                }
              }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  }
};
