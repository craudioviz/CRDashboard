// CRAIViz Sync API — Full Diagnostic Routes

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT;

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use(express.json()); // JSON parser for /api/sync

// Health check
app.get('/', (req, res) => {
  res.send('CRAIViz Sync API is live');
});

// Diagnostic GET route
app.get('/api/sync/test', (req, res) => {
  console.log('✅ GET /api/sync/test triggered');
  res.status(200).json({ status: 'test-ok', timestamp: new Date().toISOString() });
});

// JSON POST route (currently blocked)
app.post('/api/sync', (req, res) => {
  console.log('🔔 POST /api/sync triggered');
  console.log('📦 Body:', req.body);

  res.status(200).json({ status: 'received', timestamp: new Date().toISOString() });
});

// Fallback POST route using text/plain
app.post('/api/sync/fallback', express.text(), (req, res) => {
  console.log('🧪 Fallback POST /api/sync/fallback triggered');
  console.log('📝 Raw body:', req.body);

  res.status(200).json({ status: 'fallback-received', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 CRAIViz Sync API live on assigned port: ${port}`);
});