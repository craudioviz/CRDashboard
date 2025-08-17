// CRAIViz Sync API — Diagnostic Patch + Audit Logging

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT;

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('CRAIViz Sync API is live');
});

// Sync endpoint with diagnostics
app.post('/api/sync', (req, res) => {
  console.log('🔔 Incoming POST /api/sync');
  console.log('📨 Headers:', req.headers);
  console.log('📦 Body:', req.body);

  const payload = req.body || {};
  const timestamp = new Date().toISOString();

  const logEntry = {
    timestamp,
    trigger: payload.trigger || 'unknown',
    source: payload.source || 'unknown',
    raw: payload
  };

  const logPath = path.join(logsDir, `sync-${Date.now()}.json`);
  fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2));

  res.status(200).json({ status: 'success', timestamp });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 CRAIViz Sync API live on assigned port: ${port}`);
});