const express = require('express');
const router = express.Router();

const avatarStates = {};

router.post('/:email/update', (req, res) => {
  const { mood, context } = req.body;
  if (!avatarStates[req.params.email]) {
    avatarStates[req.params.email] = [];
  }
  avatarStates[req.params.email].push({
    mood,
    context,
    timestamp: Date.now()
  });
  res.status(200).json({ message: "Avatar state updated", state: avatarStates[req.params.email] });
});

router.get('/:email/history', (req, res) => {
  const history = avatarStates[req.params.email] || [];
  res.status(200).json({ history });
});

router.post('/:email/rollback', (req, res) => {
  if (!avatarStates[req.params.email] || avatarStates[req.params.email].length < 2) {
    return res.status(400).json({ error: "Not enough history to rollback" });
  }
  avatarStates[req.params.email].pop();
  const latest = avatarStates[req.params.email].slice(-1)[0];
  res.status(200).json({ message: "Rolled back", current: latest });
});

module.exports = router;
