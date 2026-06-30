const Oficina = require("../models/Oficina");
const asyncHandler = require("../utils/asyncHandler");

exports.createOficina = asyncHandler(async (req, res, next) => {
  const oficina = await Oficina.create(req.body);
  res.status(201).json(oficina);
});

exports.getOficinas = asyncHandler(async (req, res, next) => {
  const oficinas = await Oficina.find()
    .populate("temaId")
    .populate("tutorId")
    .populate("professorId");
  res.status(200).json(oficinas);
});

exports.getOficina = asyncHandler(async (req, res, next) => {
  const oficina = await Oficina.findById(req.params.id)
    .populate("temaId")
    .populate("tutorId")
    .populate("professorId");
  if (!oficina) {
    return res.status(404).json({
      success: false,
      error: `Oficina não encontrada com o id: ${req.params.id}`
    });
  }
  res.status(200).json(oficina);
});

exports.updateOficina = asyncHandler(async (req, res, next) => {
  const oficina = await Oficina.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!oficina) {
    return res.status(404).json({
      success: false,
      error: `Oficina não encontrada com o id: ${req.params.id}`
    });
  }
  res.status(200).json(oficina);
});

exports.deleteOficina = asyncHandler(async (req, res, next) => {
  const oficina = await Oficina.findByIdAndDelete(req.params.id);
  if (!oficina) {
    return res.status(404).json({
      success: false,
      error: `Oficina não encontrada com o id: ${req.params.id}`
    });
  }
  res.status(200).json({
    message: "Oficina deletada"
  });
});
