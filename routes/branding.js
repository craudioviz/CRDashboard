const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../public/assets/branding.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("❌ Branding read error:", err);
      return res.status(500).json({ error: "Unable to load branding" });
    }
    try {
      const branding = JSON.parse(data);
      res.status(200).json(branding);
    } catch (parseErr) {
      console.error("❌ Branding parse error:", parseErr);
      res.status(500).json({ error: "Invalid branding format" });
    }
  });
});

module.exports = router;
