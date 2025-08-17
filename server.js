const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Ensure logs folder exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// ✅ Middleware
app.use(express.json());

// ✅ Sync endpoint
app.post('/sync', (req, res) => {
  const payload = req.body;
  const logPath = path.join(logsDir, 'upload.log');
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(payload)}\n`;

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Log write failed:', err);
      return res.status(500).json({ status: 'error', message: 'Log write failed' });
    }
    res.json({ status: 'success', message: 'Telemetry and score uploaded', timestamp: new Date().toISOString() });
  });
});

// ✅ Serve dashboard
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`CRAIViz Sync API running on port ${PORT}`);
});

app.post("/registry", (req, res) => {
  const payload = req.body;
  const fs = require("fs");
  const path = require("path");
  const logPath = path.join(__dirname, "logs", "registry.log");
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(payload)}\n`;
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error("Registry log failed:", err);
      return res.status(500).json({ status: "error", message: "Registry log failed" });
    }
    res.json({ status: "success", message: "Contributor registry uploaded", timestamp: new Date().toISOString() });
  });
});

// trigger redeploy

const registryLogPath = path.join(logsDir, "registry.log");
if (!fs.existsSync(registryLogPath)) {
  fs.writeFileSync(registryLogPath, "");
}

