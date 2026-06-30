module.exports = {
  "/api/tutores": {
    get: {
      tags: ["Tutores"],
      summary: "Retorna todos os tutores",
      responses: {
        200: {
          description: "Lista de tutores retornada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Tutor" }
              }
            }
          }
        },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    post: {
      tags: ["Tutores"],
      summary: "Cadastra um novo tutor",
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
          description: "Tutor cadastrado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tutor" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    }
  },
  "/api/tutores/{id}": {
    get: {
      tags: ["Tutores"],
      summary: "Retorna um tutor pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Tutor encontrado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tutor" }
            }
          }
        },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    put: {
      tags: ["Tutores"],
      summary: "Atualiza um tutor pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TutorInput" }
          }
        }
      },
      responses: {
        200: {
          description: "Tutor atualizado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Tutor" }
            }
          }
        },
        400: { $ref: "#/components/responses/BadRequest" },
        404: { $ref: "#/components/responses/NotFound" },
        500: { $ref: "#/components/responses/ServerError" }
      }
    },
    delete: {
      tags: ["Tutores"],
      summary: "Remove um tutor pelo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: {
          description: "Tutor deletado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Tutor removido com sucesso" }
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
