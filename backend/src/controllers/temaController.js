const Tema = require("../models/Tema");
const asyncHandler = require("../utils/asyncHandler");

exports.createTema = asyncHandler(async (req, res, next) => {
  const tema = await Tema.create(req.body);
  res.status(201).json(tema);
});

exports.getTemas = asyncHandler(async (req, res, next) => {
  const temas = await Tema.find();
  res.status(200).json(temas);
});

exports.getTema = asyncHandler(async (req, res, next) => {
  const tema = await Tema.findById(req.params.id);
  if (!tema) {
    return res.status(404).json({
      success: false,
      error: `Tema não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(tema);
});

exports.updateTema = asyncHandler(async (req, res, next) => {
  const tema = await Tema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tema) {
    return res.status(404).json({
      success: false,
      error: `Tema não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(tema);
});

exports.deleteTema = asyncHandler(async (req, res, next) => {
  const tema = await Tema.findByIdAndDelete(req.params.id);
  if (!tema) {
    return res.status(404).json({
      success: false,
      error: `Tema não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json({
    message: "Tema deletado"
  });
});
