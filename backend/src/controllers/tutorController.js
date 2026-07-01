const Tutor = require("../models/Tutor");
const Oficina = require("../models/Oficina");
const asyncHandler = require("../utils/asyncHandler");

exports.createTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.create(req.body);
  res.status(201).json(tutor);
});

exports.getTutores = asyncHandler(async (req, res, next) => {
  const tutores = await Tutor.find().lean();
  
  const tutoresComOficinas = await Promise.all(tutores.map(async (tutor) => {
    const totalOficinas = await Oficina.countDocuments({ tutorId: tutor._id });
    return { ...tutor, totalOficinas };
  }));

  res.status(200).json(tutoresComOficinas);
});

exports.getTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findById(req.params.id).lean();
  if (!tutor) {
    return res.status(404).json({
      success: false,
      error: `Tutor não encontrado com o id: ${req.params.id}`
    });
  }

  // Buscar oficinas vinculadas a este tutor
  const oficinas = await Oficina.find({ tutorId: tutor._id })
    .populate("temaId")
    .populate("professorId");

  res.status(200).json({
    ...tutor,
    oficinas
  });
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
