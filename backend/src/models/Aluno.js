const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
    trim: true
  },
  escola: {
    type: String,
    required: [true, "Escola é obrigatória"],
    trim: true
  },
  idade: {
    type: Number,
    required: [true, "Idade é obrigatória"]
  }
}, {
  timestamps: true,
  collection: "alunos"
});

module.exports = mongoose.model("Aluno", AlunoSchema);
