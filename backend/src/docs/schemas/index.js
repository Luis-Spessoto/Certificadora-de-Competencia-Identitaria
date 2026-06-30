const alunoSchema = require("./features/alunoSchema");
const professorSchema = require("./features/professorSchema");
const tutorSchema = require("./features/tutorSchema");
const temaSchema = require("./features/temaSchema");
const oficinaSchema = require("./features/oficinaSchema");
const turmaSchema = require("./features/turmaSchema");

module.exports = {
  ...alunoSchema,
  ...professorSchema,
  ...tutorSchema,
  ...temaSchema,
  ...oficinaSchema,
  ...turmaSchema
};
