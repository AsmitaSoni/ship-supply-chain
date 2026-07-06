const Path = require("../models/Path");

// Create Path
exports.createPath = async (req, res) => {
  try {
    const path = await Path.create(req.body);
    res.status(201).json(path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Paths
exports.getPaths = async (req, res) => {
  try {
    const paths = await Path.find()
      .populate("fromLocation")
      .populate("toLocation");

    res.json(paths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Path
exports.getPath = async (req, res) => {
  try {
    const path = await Path.findById(req.params.id)
      .populate("fromLocation")
      .populate("toLocation");

    if (!path)
      return res.status(404).json({
        message: "Path not found",
      });

    res.json(path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Path
exports.updatePath = async (req, res) => {
  try {
    const path = await Path.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Path
exports.deletePath = async (req, res) => {
  try {
    await Path.findByIdAndDelete(req.params.id);

    res.json({
      message: "Path deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};