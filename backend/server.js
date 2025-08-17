const mongoose = require("mongoose");
const Checkpoint = require("./models/Checkpoint");
const express = require("express");
const cors = require('cors');
require('dotenv').config();
const Onboarding = require("./models/Onboarding");
const onboardRoutes = require('./routes/onboard');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', onboardRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
app.use('/api/onboarding', require('./routes/onboarding'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// Onboarding route
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

router.post('/api/onboard', async (req, res) => {
  try {
    const data = req.body;
    console.log("Received onboarding:", data);
    res.status(200).json({ message: "Onboarding data saved successfully" });
  } catch (err) {
    console.error("Onboarding error:", err);
    res.status(500).json({ error: "Failed to save onboarding data" });
  }
});

app.use(router);

// MongoDB model
const onboardingSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  role: String,
  goals: String,
  interests: [String]
});

// Updated onboarding route
router.post('/api/onboard', async (req, res) => {
  try {
    const data = new Onboarding(req.body);
    await data.save();
    console.log("Saved onboarding:", data);
    res.status(200).json({ message: "Onboarding data saved to MongoDB" });
  } catch (err) {
    console.error("MongoDB save error:", err);
    res.status(500).json({ error: "Failed to save onboarding data" });
  }
});
