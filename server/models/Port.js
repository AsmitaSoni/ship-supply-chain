const mongoose = require("mongoose");

const portSchema = new mongoose.Schema(
  {
    portName: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Port", portSchema);