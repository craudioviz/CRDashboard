const mongoose = require("mongoose");

const checkpointSchema = new mongoose.Schema({
  type: { type: String, default: "onboarding" },
  timestamp: { type: Date, default: Date.now },
  payload: { type: Object }
});

module.exports = mongoose.model("Checkpoint", checkpointSchema);
