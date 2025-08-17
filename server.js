const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const ensureLog = (filename) => {
  const fullPath = path.join(logsDir, filename);
  if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, '');
  return fullPath;
};

const uploadLog = ensureLog('upload.log');
const registryLog = ensureLog('registry.log');
const analyticsLog = ensureLog('analytics.log');
const telemetryLog = ensureLog('telemetry.log');
const scoreLog = ensureLog('score.log');
const auditLog = ensureLog('audit.log');
const diagnosticsLog = ensureLog('diagnostics.log');

app.use(express.json());

fs.appendFile(diagnosticsLog, `[${new Date().toISOString()}] CRAIViz Sync API booted\n`, () => {});

app.post('/sync', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(uploadLog, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Upload log failed' });
    res.json({ status: 'success', message: 'Telemetry and score uploaded', timestamp: new Date().toISOString() });
  });
});

app.post('/registry', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(registryLog, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Registry log failed' });
    res.json({ status: 'success', message: 'Contributor registry uploaded', timestamp: new Date().toISOString() });
  });
});

app.post('/analytics', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(analyticsLog, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Analytics log failed' });
    res.json({ status: 'success', message: 'Analytics data uploaded', timestamp: new Date().toISOString() });
  });
});

app.post('/telemetry', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(telemetryLog, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Telemetry log failed' });
    res.json({ status: 'success', message: 'Emotional telemetry uploaded', timestamp: new Date().toISOString() });
  });
});

app.post('/score', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(scoreLog, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Score log failed' });
    res.json({ status: 'success', message: 'Contributor score uploaded', timestamp: new Date().toISOString() });
  });
});

app.post('/audit', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] AUDIT: ${JSON.stringify(req.body)}\n`;
  fs.appendFile(diagnosticsLog, `[${new Date().toISOString()}] /audit route registered\n`, () => {});
  fs.appendFile(auditLog, logEntry, err => {
    if (err) {
      fs.appendFile(diagnosticsLog, `[${new Date().toISOString()}] Audit log failed\n`, () => {});
      return res.status(500).json({ status: "error", message: "Audit log failed" });
    }
    fs.appendFile(diagnosticsLog, `[${new Date().toISOString()}] Audit log success\n`, () => {});
    res.json({ status: "success", message: "Audit trail validated", timestamp: new Date().toISOString() });
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`CRAIViz Sync API running on port ${PORT}`);
});
