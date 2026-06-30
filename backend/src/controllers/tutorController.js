const Tutor = require("../models/Tutor");
const asyncHandler = require("../utils/asyncHandler");

exports.createTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.create(req.body);
  res.status(201).json(tutor);
});

exports.getTutores = asyncHandler(async (req, res, next) => {
  const tutores = await Tutor.find();
  res.status(200).json(tutores);
});

exports.getTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findById(req.params.id);
  if (!tutor) {
    return res.status(404).json({
      success: false,
      error: `Tutor não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(tutor);
});

exports.updateTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tutor) {
    return res.status(404).json({
      success: false,
      error: `Tutor não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json(tutor);
});

exports.deleteTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findByIdAndDelete(req.params.id);
  if (!tutor) {
    return res.status(404).json({
      success: false,
      error: `Tutor não encontrado com o id: ${req.params.id}`
    });
  }
  res.status(200).json({
    message: "Tutor deletado"
  });
});
