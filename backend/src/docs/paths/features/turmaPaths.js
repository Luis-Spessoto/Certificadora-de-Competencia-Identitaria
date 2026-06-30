module.exports = {
  "/api/turmas": {
    get: {
      tags: ["Turmas"],
      summary: "Retorna todas as turmas (populadas)",
      responses: {
        200: {
          description: "Lista de turmas retornada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Turma" }
              }
            }
          }
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    post: {
      tags: ["Turmas"],
      summary: "Cria uma nova turma para uma oficina",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TurmaInput" }
          }
        }
      },
      responses: {
        201: {
          description: "Turma criada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Turma" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/turmas/{id}": {
    get: {
      tags: ["Turmas"],
      summary: "Retorna os detalhes de uma turma específica pelo ID (populada)",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Turma encontrada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Turma" }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    put: {
      tags: ["Turmas"],
      summary: "Atualiza dados da turma ou alunos matriculados",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TurmaInput" }
          }
        }
      },
      responses: {
        200: {
          description: "Turma atualizada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Turma" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    delete: {
      tags: ["Turmas"],
      summary: "Exclui uma turma pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Turma deletada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Turma excluída com sucesso" }
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
