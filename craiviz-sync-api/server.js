const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/upload', (req, res) => {
  const log = {
    timestamp: new Date().toISOString(),
    contributor_id: req.body.contributor_id,
    emotional_score: req.body.emotional_score,
    telemetry: req.body.telemetry,
    dashboard_summary: req.body.dashboard_summary
  };

  fs.appendFileSync('logs/upload.log', JSON.stringify(log) + '\n');
  res.status(200).send({ status: 'success', received: log });
});

app.listen(PORT, () => {
  console.log();
});
