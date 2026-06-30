const mongoose = require("mongoose");

const TurmaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome da turma é obrigatório"],
    trim: true
  },
  oficinaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Oficina",
    required: [true, "Oficina é obrigatória"]
  },
  alunos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno"
  }]
}, {
  timestamps: true,
  collection: "turmas"
});

module.exports = mongoose.model("Turma", TurmaSchema);
