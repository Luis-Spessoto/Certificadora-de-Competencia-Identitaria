const Professor = require("../models/Professor");
const asyncHandler = require("../utils/asyncHandler");

exports.createProfessor = asyncHandler(async (req, res, next) => {
  const professor = await Professor.create(req.body);
  res.status(201).json(professor);
});

exports.getProfessores = asyncHandler(async (req, res, next) => {
  const professores = await Professor.find();
  res.status(200).json(professores);
});

exports.getProfessor = asyncHandler(async (req, res, next) => {
  const professor = await Professor.findById(req.params.id);
  if (!professor) {
    return res.status(404).json({
      success: false,
      error: `Professor não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(professor);
});

exports.updateProfessor = asyncHandler(async (req, res, next) => {
  const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!professor) {
    return res.status(404).json({
      success: false,
      error: `Professor não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(professor);
});

exports.deleteProfessor = asyncHandler(async (req, res, next) => {
  const professor = await Professor.findByIdAndDelete(req.params.id);
  if (!professor) {
    return res.status(404).json({
      success: false,
      error: `Professor não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json({
    message: "Professor deletado"
  });
});
