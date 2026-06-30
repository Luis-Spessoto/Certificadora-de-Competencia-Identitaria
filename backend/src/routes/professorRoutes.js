const express = require("express");
const router = express.Router();
const {
  createProfessor,
  getProfessores,
  getProfessor,
  updateProfessor,
  deleteProfessor
} = require("../controllers/professorController");

router.route("/")
  .post(createProfessor)
  .get(getProfessores);

router.route("/:id")
  .get(getProfessor)
  .put(updateProfessor)
  .delete(deleteProfessor);

module.exports = router;
