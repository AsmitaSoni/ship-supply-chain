const Vessel = require("../models/Vessel");

// Create Vessel
exports.createVessel = async (req, res) => {
    try {
        const vessel = await Vessel.create(req.body);

        res.status(201).json(vessel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Vessels
exports.getVessels = async (req, res) => {
    try {
        const vessels = await Vessel.find();

        res.json(vessels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get One Vessel
exports.getVessel = async (req, res) => {
    try {
        const vessel = await Vessel.findById(req.params.id);

        if (!vessel)
            return res.status(404).json({
                message: "Vessel not found",
            });

        res.json(vessel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Vessel
exports.updateVessel = async (req, res) => {
    try {
        const vessel = await Vessel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(vessel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Vessel
exports.deleteVessel = async (req, res) => {
    try {
        await Vessel.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted Successfully",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};