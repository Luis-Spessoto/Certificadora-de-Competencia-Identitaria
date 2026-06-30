module.exports = {
  "/api/auth/register": {
    post: {
      tags: ["Autenticação"],
      summary: "Auto-cadastro de um novo tutor monitor",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TutorInput" }
          }
        }
      },
      responses: {
        201: {
          description: "Tutor auto-cadastrado com sucesso (status pendente)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tutor" }
            }
          }
        },
        409: {
          description: "E-mail já cadastrado"
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/auth/login": {
    post: {
      tags: ["Autenticação"],
      summary: "Autentica um tutor, administrador ou professor",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "senha"],
              properties: {
                email: { type: "string" },
                senha: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Login bem sucedido",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: { type: "string" },
                  user: { $ref: "#/components/schemas/Tutor" }
                }
              }
            }
          }
        },
        401: {
          description: "Credenciais inválidas"
        },
        403: {
          description: "Acesso inativo ou pendente"
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/auth/me": {
    get: {
      tags: ["Autenticação"],
      summary: "Retorna os dados do usuário autenticado (tutor, admin ou professor)",
      responses: {
        200: {
          description: "Dados do usuário logado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tutor" }
            }
          }
        },
        401: {
          description: "Não autorizado"
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  }
};
