module.exports = {
  "/api/professores": {
    get: {
      tags: ["Professores"],
      summary: "Retorna todos os professores",
      responses: {
        200: {
          description: "Lista de professores retornada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Professor" }
              }
            }
          }
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    post: {
      tags: ["Professores"],
      summary: "Cadastra um novo professor",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ProfessorInput" }
          }
        }
      },
      responses: {
        201: {
          description: "Professor cadastrado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Professor" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/professores/{id}": {
    get: {
      tags: ["Professores"],
      summary: "Retorna um professor pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Professor encontrado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Professor" }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    put: {
      tags: ["Professores"],
      summary: "Atualiza um professor pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ProfessorInput" }
          }
        }
      },
      responses: {
        200: {
          description: "Professor atualizado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Professor" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    delete: {
      tags: ["Professores"],
      summary: "Remove um professor pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Professor deletado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Professor removido com sucesso" }
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
