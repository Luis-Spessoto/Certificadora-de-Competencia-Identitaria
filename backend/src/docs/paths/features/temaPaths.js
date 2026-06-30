module.exports = {
  "/api/temas": {
    get: {
      tags: ["Temas"],
      summary: "Retorna todos os temas",
      responses: {
        200: {
          description: "Lista de temas retornada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Tema" }
              }
            }
          }
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    post: {
      tags: ["Temas"],
      summary: "Cria uma nova proposta de tema",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TemaInput" }
          }
        }
      },
      responses: {
        201: {
          description: "Tema criado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tema" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/temas/{id}": {
    get: {
      tags: ["Temas"],
      summary: "Retorna um tema pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Tema encontrado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tema" }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    put: {
      tags: ["Temas"],
      summary: "Atualiza ou aprova um tema pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TemaInput" }
          }
        }
      },
      responses: {
        200: {
          description: "Tema atualizado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tema" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    delete: {
      tags: ["Temas"],
      summary: "Deleta uma proposta de tema pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Tema deletado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Tema removido com sucesso" }
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
