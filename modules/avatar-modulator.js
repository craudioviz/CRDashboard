const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const traits = req.body.traits || [];
  const modulated = [...traits, "adaptive", "emotion-aware"];

  const entry = {
    contributor: req.body.contributor || "unknown",
    timestamp: new Date().toISOString(),
    event: "avatar_modulated",
    payload: { original: traits, modulated }
  };

  console.log("🧬 Avatar Modulated:", entry);
  res.json({ status: "modulated", entry });
});

module.exports = router;