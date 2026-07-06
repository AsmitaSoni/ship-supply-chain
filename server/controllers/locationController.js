const Location = require("../models/Location");

// Create Location
exports.createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate("port");

    res.json(locations);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get One Location
exports.getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate("port");

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    res.json(location);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Location
exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(location);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Location
exports.deleteLocation = async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);

    res.json({
      message: "Location deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};