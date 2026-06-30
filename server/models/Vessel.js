const mongoose = require("mongoose");

const vesselSchema = new mongoose.Schema(
{
    vesselName: {
        type: String,
        required: true,
    },

    imoNumber: {
        type: String,
        required: true,
        unique: true,
    },

    vesselType: {
        type: String,
    },

    flag: {
        type: String,
    },

    owner: {
        type: String,
    },

    status: {
        type: String,
        default: "Active",
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Vessel", vesselSchema);