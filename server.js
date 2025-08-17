const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const registryLogPath = path.join(logsDir, 'registry.log');
if (!fs.existsSync(registryLogPath)) fs.writeFileSync(registryLogPath, '');

app.use(express.json());

// ✅ /sync endpoint
app.post('/sync', (req, res) => {
  const logPath = path.join(logsDir, 'upload.log');
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(logPath, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Log write failed' });
    res.json({ status: 'success', message: 'Telemetry and score uploaded', timestamp: new Date().toISOString() });
  });
});

// ✅ /registry endpoint
app.post('/registry', (req, res) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(registryLogPath, logEntry, err => {
    if (err) return res.status(500).json({ status: 'error', message: 'Registry log failed' });
    res.json({ status: 'success', message: 'Contributor registry uploaded', timestamp: new Date().toISOString() });
  });
});

// ✅ Static dashboard
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`CRAIViz Sync API running on port ${PORT}`);
});

app.post("/analytics", (req, res) => {
  const logPath = path.join(logsDir, "analytics.log");
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(logPath, logEntry, err => {
    if (err) return res.status(500).json({ status: "error", message: "Analytics log failed" });
    res.json({ status: "success", message: "Analytics data uploaded", timestamp: new Date().toISOString() });
  });
});

// trigger redeploy for analytics
