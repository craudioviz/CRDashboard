// modules/batch-scoring.js
const express = require('express');
const router = express.Router();

function scoreEmotion(text) {
  const lower = text.toLowerCase();
  if (lower.includes("love") || lower.includes("excited")) return "positive";
  if (lower.includes("hate") || lower.includes("frustrated")) return "negative";
  return "neutral";
}

router.post('/', (req, res) => {
  const contributor = req.body.contributor || "unknown";
  const feedbackArray = req.body.feedback || [];

  const results = feedbackArray.map((text, index) => {
    const sentiment = scoreEmotion(text);
    return {
      index,
      contributor,
      timestamp: new Date().toISOString(),
      event: "batch_feedback_scored",
      payload: { text, sentiment }
    };
  });

  console.log("📊 Batch Scoring:", results);
  res.json({ status: "scored", results });
});

module.exports = router;