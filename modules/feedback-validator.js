// modules/feedback-validator.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const feedback = req.body.feedback || "";
  const score = feedback.includes("great") ? 1 : 0;

  const entry = {
    contributor: req.body.contributor || "unknown",
    timestamp: new Date().toISOString(),
    event: "feedback_validated",
    payload: { feedback, score }
  };

  console.log("🧠 Feedback Validated:", entry);
  res.json({ status: "validated", entry });
});

module.exports = router;