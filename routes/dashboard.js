const express = require('express');
const router = express.Router();
const axios = require('axios');

const PORT = process.env.PORT || 4000;

router.get('/:email', async (req, res) => {
  try {
    const personaRes = await axios.get(`http://localhost:${PORT}/persona/${req.params.email}`);
    const eventsRes = await axios.get(`http://localhost:${PORT}/analytics/events`);
    res.status(200).json({
      persona: personaRes.data,
      events: eventsRes.data.events.filter(e => e.email === req.params.email)
    });
  } catch (err) {
    res.status(500).json({ error: "Dashboard fetch failed", details: err.message });
  }
});

module.exports = router;
