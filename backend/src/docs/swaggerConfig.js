const swaggerJsdoc = require("swagger-jsdoc");
const paths = require("./paths");
const schemas = require("./schemas");
const responses = require("./responses");
const tags = require("./tags");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Controle de Oficinas",
      version: "1.0.0",
      description: "Documentação da API RESTful para o projeto de extensão ELLP (UTFPR)"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ],
    tags,
    paths,
    components: {
      schemas,
      responses
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
