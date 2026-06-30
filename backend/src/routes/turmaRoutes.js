const express = require("express");
const router = express.Router();
const {
  createTurma,
  getTurmas,
  getTurma,
  updateTurma,
  deleteTurma
} = require("../controllers/turmaController");

router.route("/")
  .post(createTurma)
  .get(getTurmas);

router.route("/:id")
  .get(getTurma)
  .put(updateTurma)
  .delete(deleteTurma);

module.exports = router;
