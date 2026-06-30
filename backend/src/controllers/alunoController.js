const Aluno = require("../models/Aluno");
const asyncHandler = require("../utils/asyncHandler");

exports.createAluno = asyncHandler(async (req, res, next) => {
  const aluno = await Aluno.create(req.body);
  res.status(201).json(aluno);
});

exports.getAlunos = asyncHandler(async (req, res, next) => {
  const alunos = await Aluno.find();
  res.status(200).json(alunos);
});

exports.getAluno = asyncHandler(async (req, res, next) => {
  const aluno = await Aluno.findById(req.params.id);
  if (!aluno) {
    return res.status(404).json({
      success: false,
      error: `Aluno não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(aluno);
});

exports.updateAluno = asyncHandler(async (req, res, next) => {
  const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!aluno) {
    return res.status(404).json({
      success: false,
      error: `Aluno não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(aluno);
});

exports.deleteAluno = asyncHandler(async (req, res, next) => {
  const aluno = await Aluno.findByIdAndDelete(req.params.id);
  if (!aluno) {
    return res.status(404).json({
      success: false,
      error: `Aluno não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json({
    message: "Aluno deletado"
  });
});
