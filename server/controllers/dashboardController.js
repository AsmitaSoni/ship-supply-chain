const Vessel = require("../models/Vessel");
const User = require("../models/User");

exports.getStats = async (req, res) => {

    const totalVessels =
        await Vessel.countDocuments();

    const activeVessels =
        await Vessel.countDocuments({
            status: "Active",
        });

    const totalUsers =
        await User.countDocuments();

    res.json({
        totalVessels,
        activeVessels,
        totalUsers,
    });

};