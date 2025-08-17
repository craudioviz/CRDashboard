const express = require('express');
const router = express.Router();

const personas = {
  "royhenderson@craudiovizai.com": {
    avatar: "visionary",
    mood: "energized",
    history: [
      { mood: "energized", timestamp: Date.now(), trigger: "onboard" }
    ]
  }
};

router.get('/:email', (req, res) => {
  const persona = personas[req.params.email];
  if (!persona) return res.status(404).json({ error: "Persona not found" });
  res.status(200).json(persona);
});

router.post('/:email/mood', (req, res) => {
  const { mood, trigger } = req.body;
  if (!personas[req.params.email]) return res.status(404).json({ error: "Persona not found" });
  personas[req.params.email].mood = mood;
  personas[req.params.email].history.push({ mood, timestamp: Date.now(), trigger });
  res.status(200).json({ message: "Mood updated", persona: personas[req.params.email] });
});

module.exports = router;
