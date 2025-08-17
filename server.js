const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Ensure audit logs folder exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Utility: Write audit log
function writeAuditLog(action, payload) {
  const logEntry = {
    action,
    timestamp: new Date().toISOString(),
    payload
  };
  const logPath = path.join(logsDir, `${action}_${Date.now()}.json`);
  fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2));
  console.log(`[AUDIT] ${action}:`, logEntry);
}

// Route: Trigger Dashboard Preview
app.post('/preview', (req, res) => {
  const { trigger, mode, batch, audit } = req.body;

  if (trigger !== 'dashboard') {
    return res.status(400).json({ error: 'Invalid trigger' });
  }

  const previewPayload = {
    status: 'Dashboard preview triggered',
    mode,
    batch,
    audit,
    timestamp: new Date().toISOString(),
    preview_id: `preview_${Date.now()}`
  };

  if (audit) writeAuditLog('preview', previewPayload);
  res.status(200).json(previewPayload);
});

// Route: Contributor Ingestion
app.post('/ingest', (req, res) => {
  const { contributor_id, score, telemetry } = req.body;

  if (!contributor_id || typeof score !== 'number' || !telemetry) {
    return res.status(400).json({ error: 'Missing contributor data' });
  }

  const ingestPayload = {
    contributor_id,
    score,
    telemetry,
    timestamp: new Date().toISOString()
  };

  writeAuditLog('ingest', ingestPayload);
  res.status(200).json({ status: 'Contributor ingested', data: ingestPayload });
});

// Route: Avatar Mapping Injection
app.post('/inject/avatar', (req, res) => {
  const { avatar_id, linked_contributor, emotional_context, audit } = req.body;

  if (!avatar_id || !linked_contributor || !emotional_context) {
    return res.status(400).json({ error: 'Missing avatar mapping data' });
  }

  const avatarPayload = {
    avatar_id,
    linked_contributor,
    emotional_context,
    timestamp: new Date().toISOString()
  };

  if (audit) writeAuditLog('inject_avatar', avatarPayload);
  res.status(200).json({ status: 'Avatar mapping injected', data: avatarPayload });
});

// Default fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Launch server
app.listen(PORT, () => {
  console.log(`🚀 CRAIViz Sync API live on assigned port: ${PORT}`);
});
