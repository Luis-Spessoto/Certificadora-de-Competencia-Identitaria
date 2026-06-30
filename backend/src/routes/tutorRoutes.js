const express = require("express");
const router = express.Router();
const {
  createTutor,
  getTutores,
  getTutor,
  updateTutor,
  deleteTutor
} = require("../controllers/tutorController");

router.route("/")
  .post(createTutor)
  .get(getTutores);

router.route("/:id")
  .get(getTutor)
  .put(updateTutor)
  .delete(deleteTutor);

module.exports = router;
