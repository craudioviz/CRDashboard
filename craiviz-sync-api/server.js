const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3100;

// ✅ Ensure logs/ folder exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.use(bodyParser.json());

app.post('/upload', (req, res) => {
  const log = {
    timestamp: new Date().toISOString(),
    contributor_id: req.body.contributor_id,
    emotional_score: req.body.emotional_score,
    telemetry: req.body.telemetry,
    dashboard_summary: req.body.dashboard_summary
  };

  fs.appendFileSync(path.join(logDir, 'upload.log'), JSON.stringify(log) + '\n');
  res.status(200).send({ status: 'success', received: log });
});

app.listen(PORT, () => {
  console.log(`CRAIViz Sync API running on port ${PORT}`);
});
