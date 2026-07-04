const express = require("express");
const router = express.Router();

const {
  createPort,
  getPorts,
  getPort,
  updatePort,
  deletePort,
} = require("../controllers/portController");

const protect = require("../middleware/authMiddleware");

router.use(protect);

router.route("/")
  .get(getPorts)
  .post(createPort);

router.route("/:id")
  .get(getPort)
  .put(updatePort)
  .delete(deletePort);

module.exports = router;