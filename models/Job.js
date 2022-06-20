const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxlength: [50, "Company name must be less than 50 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      maxlength: [100, "Position name must be less than 50 characters"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
