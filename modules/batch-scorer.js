const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const contributors = req.body.contributors || [];
  const scored = contributors.map(c => ({
    id: c.id,
    score: c.feedback.includes("great") ? 1 : 0
  }));

  const entry = {
    timestamp: new Date().toISOString(),
    event: "batch_scored",
    payload: scored
  };

  console.log("📊 Batch Scored:", entry);
  res.json({ status: "scored", entry });
});

module.exports = router;