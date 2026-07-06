const express = require("express");
const router = express.Router();

const {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

const protect = require("../middleware/authMiddleware");

router.use(protect);

router
  .route("/")
  .get(getLocations)
  .post(createLocation);

router
  .route("/:id")
  .get(getLocation)
  .put(updateLocation)
  .delete(deleteLocation);

module.exports = router;