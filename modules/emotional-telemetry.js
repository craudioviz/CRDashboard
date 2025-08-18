// modules/emotional-telemetry.js
const express = require('express');
const router = express.Router();

function scoreEmotion(text) {
  const lower = text.toLowerCase();
  if (lower.includes("love") || lower.includes("excited")) return "positive";
  if (lower.includes("hate") || lower.includes("frustrated")) return "negative";
  return "neutral";
}

router.post('/', (req, res) => {
  const input = req.body.input || "";
  const contributor = req.body.contributor || "unknown";
  const sentiment = scoreEmotion(input);

  const entry = {
    contributor,
    timestamp: new Date().toISOString(),
    event: "emotional_telemetry",
    payload: { input, sentiment }
  };

  console.log("📡 Emotional Telemetry:", entry);
  res.json({ status: "scored", entry });
});

module.exports = router;