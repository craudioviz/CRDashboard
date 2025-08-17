const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  role: String,
  goals: String,
  interests: [String]
});

module.exports = mongoose.model("Onboarding", onboardingSchema);
