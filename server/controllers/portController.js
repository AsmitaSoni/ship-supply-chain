const Port = require("../models/Port");

// Create Port
exports.createPort = async (req, res) => {
  try {
    const port = await Port.create(req.body);
    res.status(201).json(port);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Ports
exports.getPorts = async (req, res) => {
  try {
    const ports = await Port.find();
    res.json(ports);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Port
exports.getPort = async (req, res) => {
  try {
    const port = await Port.findById(req.params.id);

    if (!port) {
      return res.status(404).json({
        message: "Port not found",
      });
    }

    res.json(port);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Port
exports.updatePort = async (req, res) => {
  try {
    const port = await Port.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(port);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Port
exports.deletePort = async (req, res) => {
  try {
    await Port.findByIdAndDelete(req.params.id);

    res.json({
      message: "Port Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};