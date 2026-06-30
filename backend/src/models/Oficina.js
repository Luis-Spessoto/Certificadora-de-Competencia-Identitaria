const mongoose = require("mongoose");

const OficinaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome da oficina é obrigatório"],
    trim: true
  },
  temaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tema",
    required: [true, "Tema é obrigatório"]
  },
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: [true, "Tutor é obrigatório"]
  },
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: [true, "Professor é obrigatório"]
  },
  data: {
    type: String,
    required: [true, "Data é obrigatória"]
  },
  horario: {
    type: String,
    required: [true, "Horário é obrigatório"]
  },
  local: {
    type: String,
    required: [true, "Local é obrigatório"],
    trim: true
  }
}, {
  timestamps: true,
  collection: "oficinas"
});

module.exports = mongoose.model("Oficina", OficinaSchema);
