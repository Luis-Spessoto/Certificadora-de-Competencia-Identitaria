const Turma = require("../models/Turma");
const asyncHandler = require("../utils/asyncHandler");

exports.createTurma = asyncHandler(async (req, res, next) => {
  const turma = await Turma.create(req.body);
  res.status(201).json(turma);
});

exports.getTurmas = asyncHandler(async (req, res, next) => {
  const turmas = await Turma.find()
    .populate({
      path: "oficinaId",
      populate: [
        { path: "temaId" },
        { path: "tutorId" },
        { path: "professorId" }
      ]
    })
    .populate("alunos");
  res.status(200).json(turmas);
});

exports.getTurma = asyncHandler(async (req, res, next) => {
  const turma = await Turma.findById(req.params.id)
    .populate({
      path: "oficinaId",
      populate: [
        { path: "temaId" },
        { path: "tutorId" },
        { path: "professorId" }
      ]
    })
    .populate("alunos");
  if (!turma) {
    return res.status(404).json({
      success: false,
      error: `Turma não encontrada com o id: ${req.params.id}`
    });
  }
  res.status(200).json(turma);
});

exports.updateTurma = asyncHandler(async (req, res, next) => {
  const turma = await Turma.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!turma) {
    return res.status(404).json({
      success: false,
      error: `Turma não encontrada com o id: ${req.params.id}`
    });
  }
  res.status(200).json(turma);
});

exports.deleteTurma = asyncHandler(async (req, res, next) => {
  const turma = await Turma.findByIdAndDelete(req.params.id);
  if (!turma) {
    return res.status(404).json({
      success: false,
      error: `Turma não encontrada com o id: ${req.params.id}`
    });
  }
  res.status(200).json({
    message: "Turma deletada"
  });
});
