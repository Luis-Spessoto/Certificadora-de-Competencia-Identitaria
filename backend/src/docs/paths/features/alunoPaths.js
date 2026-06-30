module.exports = {
  "/api/alunos": {
    get: {
      tags: ["Alunos"],
      summary: "Retorna todos os alunos",
      responses: {
        200: {
          description: "Lista de alunos retornada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Aluno" }
              }
            }
          }
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    post: {
      tags: ["Alunos"],
      summary: "Cadastra um novo aluno",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AlunoInput" }
          }
        }
      },
      responses: {
        201: {
          description: "Aluno criado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Aluno" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/alunos/{id}": {
    get: {
      tags: ["Alunos"],
      summary: "Retorna um aluno pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Aluno encontrado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Aluno" }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    put: {
      tags: ["Alunos"],
      summary: "Atualiza um aluno pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AlunoInput" }
          }
        }
      },
      responses: {
        200: {
          description: "Aluno atualizado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Aluno" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    delete: {
      tags: ["Alunos"],
      summary: "Remove um aluno pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Aluno deletado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Aluno removido com sucesso" }
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
