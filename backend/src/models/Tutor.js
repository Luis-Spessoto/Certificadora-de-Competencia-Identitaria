const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TutorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"]
  },
  curso: {
    type: String,
    required: [true, "Curso é obrigatório"],
    trim: true
  },
  periodo: {
    type: String,
    required: [true, "Período é obrigatório"],
    trim: true
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"]
  },
  role: {
    type: String,
    enum: ["admin", "tutor"],
    default: "tutor"
  },
  status: {
    type: String,
    enum: ["pendente", "ativo", "inativo"],
    default: "pendente"
  }
}, {
  timestamps: true,
  collection: "tutores"
});

TutorSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

module.exports = mongoose.model("Tutor", TutorSchema);
