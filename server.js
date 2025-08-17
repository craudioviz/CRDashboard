const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware: Validate contributor context
app.use((req, res, next) => {
  const contributorId = process.env.CONTRIBUTOR_ID;
  if (!contributorId) {
    console.warn('⚠️ Contributor ID missing in environment.');
    return res.status(500).send('Contributor ID missing.');
  }
  req.contributorId = contributorId;
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send(`✅ CRDashboard-1 is live for contributor: ${req.contributorId}`);
});

// Telemetry route
app.post('/telemetry', (req, res) => {
  const payload = {
    contributor: req.contributorId,
    timestamp: new Date().toISOString(),
    data: req.body,
  };

  console.log('📡 Telemetry received:', JSON.stringify(payload, null, 2));

  // Trigger AuditBot
  auditLog.push({
    contributor: req.contributorId,
    timestamp: payload.timestamp,
    event: req.body.event || 'unknown',
    payload: req.body,
  });

  // Trigger ScoreBot
  const score = {
    clarity_score: Math.floor(Math.random() * 30) + 70,
    modularity_score: Math.floor(Math.random() * 30) + 70,
    empathy_score: Math.floor(Math.random() * 30) + 70,
    audit_score: 100,
  };
  lastScore = score;

  // Trigger Dashboard if applicable
  if (req.body.event === 'dashboard_launch') {
    dashboardTriggered = true;
  }

  // Simulate Javai decision
  javaiLog.push({
    contributor: req.contributorId,
    timestamp: payload.timestamp,
    bot: 'ScoreBot',
    action: score.clarity_score < 75 ? 'Flagged for review' : 'Accepted',
  });

  res.status(200).json({ status: 'ok', received: payload });
});

// Audit route
const auditLog = [];
app.get('/audit', (req, res) => {
  res.json({ contributor: req.contributorId, log: auditLog });
});

// Score route
let lastScore = {};
app.get('/score', (req, res) => {
  res.json({ contributor: req.contributorId, score: lastScore });
});

// Dashboard route
let dashboardTriggered = false;
app.get('/dashboard', (req, res) => {
  if (dashboardTriggered) {
    res.send(`📊 Dashboard triggered for ${req.contributorId}`);
  } else {
    res.send(`🕒 No dashboard trigger yet for ${req.contributorId}`);
  }
});

// Javai decision log
const javaiLog = [];
app.get('/javai', (req, res) => {
  res.json({ contributor: req.contributorId, decisions: javaiLog });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 CRDashboard-1 running on port ${port}`);
});