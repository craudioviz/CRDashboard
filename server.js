const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT;

// Ensure logs folder exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use(express.json());

// Sync endpoint
app.post('/api/sync', (req, res) => {
  const payload = req.body;
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    payload
  };

  const logPath = path.join(logsDir, `sync-${Date.now()}.json`);
  fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2));

  res.status(200).json({ status: 'success', timestamp });
});

// Health check
app.get('/', (req, res) => {
  res.send('CRAIViz Sync API is live');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});