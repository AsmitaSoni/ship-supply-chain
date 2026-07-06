const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema(
  {
    fromLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    toLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    estimatedTime: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Path", pathSchema);