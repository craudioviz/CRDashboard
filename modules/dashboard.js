const express = require('express');
const router = express.Router();
const logAudit = require('./audit-log');

router.post('/', (req, res) => {
  const contributor = req.body.contributor || "unknown";
  const entries = req.body.entries || [];

  // 🧠 Sentiment Summary
  const summary = {
    contributor,
    timestamp: new Date().toISOString(),
    total: entries.length,
    positive: entries.filter(e => e.sentiment === "positive").length,
    negative: entries.filter(e => e.sentiment === "negative").length,
    neutral: entries.filter(e => e.sentiment === "neutral").length,
    preview: entries.slice(0, 5)
  };

  // 📝 Audit Log
  logAudit({
    route: 'dashboard',
    contributor,
    payload: entries
  });

  console.log("📊 Dashboard Summary:", summary);
  res.json({ status: "dashboard_ready", summary });
});

module.exports = router;