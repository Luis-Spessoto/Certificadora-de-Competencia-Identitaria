const express = require("express");
const router = express.Router();
const {
  createTema,
  getTemas,
  getTema,
  updateTema,
  deleteTema
} = require("../controllers/temaController");

router.route("/")
  .post(createTema)
  .get(getTemas);

router.route("/:id")
  .get(getTema)
  .put(updateTema)
  .delete(deleteTema);

module.exports = router;
