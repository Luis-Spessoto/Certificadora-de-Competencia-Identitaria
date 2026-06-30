const Tutor = require("../models/Tutor");
const Professor = require("../models/Professor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const seedAdmin = async () => {
  const adminExists = await Tutor.findOne({ email: "admin@ellp.utfpr.edu.br" });
  if (!adminExists) {
    const saltAdmin = await bcrypt.genSalt(10);
    const hashAdmin = await bcrypt.hash("admin123", saltAdmin);
    await Tutor.create({
      nome: "Coordenador ELLP",
      email: "admin@ellp.utfpr.edu.br",
      curso: "Coordenação",
      periodo: "1º período",
      senha: hashAdmin,
      role: "admin",
      status: "ativo"
    });
  }

  const tutorExists = await Tutor.findOne({ email: "tutor@ellp.utfpr.edu.br" });
  if (!tutorExists) {
    const saltTutor = await bcrypt.genSalt(10);
    const hashTutor = await bcrypt.hash("tutor123", saltTutor);
    await Tutor.create({
      nome: "João Vitor Furquim",
      email: "tutor@ellp.utfpr.edu.br",
      curso: "Análise e Desenvolvimento de Sistemas",
      periodo: "1º período",
      senha: hashTutor,
      role: "tutor",
      status: "ativo"
    });
  }

  const profExists = await Professor.findOne({ email: "professor@ellp.utfpr.edu.br" });
  if (!profExists) {
    const saltProf = await bcrypt.genSalt(10);
    const hashProf = await bcrypt.hash("prof123", saltProf);
    await Professor.create({
      nome: "Prof. Orientador ELLP",
      email: "professor@ellp.utfpr.edu.br",
      senha: hashProf
    });
  }
};

exports.register = asyncHandler(async (req, res, next) => {
  await seedAdmin();
  const { nome, email, curso, matricula, senha } = req.body;
  const exists = await Tutor.findOne({ email: email.toLowerCase() });
  if (exists) {
    return res.status(409).json({ success: false, error: "E-mail já cadastrado" });
  }
  const tutor = await Tutor.create({
    nome,
    email,
    curso,
    periodo: "1º período",
    senha,
    role: "tutor",
    status: "pendente"
  });
  res.status(201).json({
    id: tutor._id,
    nome: tutor.nome,
    email: tutor.email,
    role: tutor.role,
    status: tutor.status
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  await seedAdmin();
  const { email, senha } = req.body;
  const lowercaseEmail = email.toLowerCase();
  
  let user = await Tutor.findOne({ email: lowercaseEmail });
  let userType = "tutor";

  if (!user) {
    user = await Professor.findOne({ email: lowercaseEmail });
    userType = "professor";
  }

  if (!user) {
    return res.status(401).json({ success: false, error: "Credenciais inválidas" });
  }

  const isMatch = await bcrypt.compare(senha, user.senha);
  if (!isMatch) {
    return res.status(401).json({ success: false, error: "Credenciais inválidas" });
  }

  if (userType === "tutor") {
    if (user.status === "pendente") {
      return res.status(403).json({ success: false, error: "Cadastro pendente de aprovação" });
    }
    if (user.status === "inativo") {
      return res.status(403).json({ success: false, error: "Tutor inativo" });
    }
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secreto", { expiresIn: "30d" });
  res.status(200).json({
    token,
    user: {
      id: user._id,
      nome: user.nome,
      email: user.email,
      role: user.role || "professor",
      status: user.status || "ativo"
    }
  });
});

exports.me = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    id: req.user._id,
    nome: req.user.nome,
    email: req.user.email,
    role: req.user.role || "professor",
    status: req.user.status || "ativo"
  });
});
