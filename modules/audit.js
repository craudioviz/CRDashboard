// modules/audit.js
const express = require('express');
const router = express.Router();

const logs = [];

// 📝 POST: Log audit entry
router.post('/', (req, res) => {
  const entry = {
    contributor: req.body.payload?.contributor || "unknown",
    timestamp: new Date().toISOString(),
    event: req.body.event || "unknown_event",
    payload: req.body.payload || {}
  };
  logs.push(entry);
  console.log("🧾 Audit Entry Logged:", entry);
  res.json({ status: "logged", entry });
});

// 📄 GET: Return all logs
router.get('/', (req, res) => {
  res.json({ contributor: "roy_henderson", log: logs });
});

module.exports = router;