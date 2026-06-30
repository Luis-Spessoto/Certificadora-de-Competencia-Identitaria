const mongoose = require("mongoose");

const TemaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "Título é obrigatório"],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, "Descrição é obrigatória"],
    trim: true
  },
  aprovado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: "temas"
});

module.exports = mongoose.model("Tema", TemaSchema);
