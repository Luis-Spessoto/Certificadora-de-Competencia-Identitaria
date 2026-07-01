const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ProfessorSchema = new mongoose.Schema({
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
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"]
  }
}, {
  timestamps: true,
  collection: "professores"
});

ProfessorSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

module.exports = mongoose.model("Professor", ProfessorSchema);
