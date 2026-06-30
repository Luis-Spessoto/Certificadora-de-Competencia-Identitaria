const express = require("express");
const router = express.Router();

const alunoRoutes = require("./alunoRoutes");
const professorRoutes = require("./professorRoutes");
const tutorRoutes = require("./tutorRoutes");
const temaRoutes = require("./temaRoutes");
const oficinaRoutes = require("./oficinaRoutes");
const turmaRoutes = require("./turmaRoutes");
const authRoutes = require("./authRoutes");

router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/tutores", tutorRoutes);
router.use("/temas", temaRoutes);
router.use("/oficinas", oficinaRoutes);
router.use("/turmas", turmaRoutes);
router.use("/auth", authRoutes);

module.exports = router;
