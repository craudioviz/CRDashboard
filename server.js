const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT;

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use(express.json()); // Reintroduce payload parsing

app.get('/', (req, res) => {
  res.send('CRAIViz Sync API is live');
});

app.post('/api/sync', (req, res) => {
  console.log('🔔 POST /api/sync triggered');
  console.log('📦 Body:', req.body);

  res.status(200).json({ status: 'received', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 CRAIViz Sync API live on assigned port: ${port}`);
});