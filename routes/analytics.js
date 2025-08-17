const express = require('express');
const router = express.Router();

const events = [];

router.post('/log', (req, res) => {
  const { email, event, context } = req.body;
  events.push({ email, event, context, timestamp: Date.now() });
  res.status(200).json({ message: "Event logged", total: events.length });
});

router.get('/events', (_, res) => {
  res.status(200).json({ events });
});

module.exports = router;
