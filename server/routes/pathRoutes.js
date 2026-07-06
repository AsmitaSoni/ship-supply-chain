const express = require("express");
const router = express.Router();

const {
  createPath,
  getPaths,
  getPath,
  updatePath,
  deletePath,
} = require("../controllers/pathController");

const protect = require("../middleware/authMiddleware");

router.use(protect);

router
  .route("/")
  .get(getPaths)
  .post(createPath);

router
  .route("/:id")
  .get(getPath)
  .put(updatePath)
  .delete(deletePath);

module.exports = router;