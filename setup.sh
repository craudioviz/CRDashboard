#!/bin/bash
set -e

echo "🚀 Injecting persona.js..."
cat > routes/persona.js << 'JS'
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
JS

echo "📊 Injecting analytics.js..."
cat > routes/analytics.js << 'JS'
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
JS

echo "🔧 Patching server.js..."
sed -i "/const brandingRouter/a const personaRouter = require('./routes/persona');" server.js
sed -i "/const brandingRouter/a const analyticsRouter = require('./routes/analytics');" server.js
sed -i "/app.use('/branding', brandingRouter);/a app.use('/persona', personaRouter);" server.js
sed -i "/app.use('/branding', brandingRouter);/a app.use('/analytics', analyticsRouter);" server.js

echo "📝 Updating README.md..."
cat >> README.md << 'MD'

## Persona & Analytics Routes

| Route                        | Method | Description                        |
|-----------------------------|--------|------------------------------------|
| `/persona/:email`           | GET    | Fetch persona profile              |
| `/persona/:email/mood`      | POST   | Update mood + log history          |
| `/analytics/log`            | POST   | Log onboarding or UX event         |
| `/analytics/events`         | GET    | Fetch all logged events            |
MD

echo "✅ Setup complete. Ready to launch."
