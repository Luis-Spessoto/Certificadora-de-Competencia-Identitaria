const express = require("express");
const router = express.Router();
const {
  createAluno,
  getAlunos,
  getAluno,
  updateAluno,
  deleteAluno
} = require("../controllers/alunoController");

router.route("/")
  .post(createAluno)
  .get(getAlunos);

router.route("/:id")
  .get(getAluno)
  .put(updateAluno)
  .delete(deleteAluno);

module.exports = router;
