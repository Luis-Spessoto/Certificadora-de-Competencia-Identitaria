const express = require("express");
const router = express.Router();
const {
  createOficina,
  getOficinas,
  getOficina,
  updateOficina,
  deleteOficina
} = require("../controllers/oficinaController");

router.route("/")
  .post(createOficina)
  .get(getOficinas);

router.route("/:id")
  .get(getOficina)
  .put(updateOficina)
  .delete(deleteOficina);

module.exports = router;
