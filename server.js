const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const contributorId = process.env.CONTRIBUTOR_ID;
  if (!contributorId) {
    console.warn('⚠️ Contributor ID missing in environment.');
    return res.status(500).send('Contributor ID missing.');
  }
  req.contributorId = contributorId;
  next();
});

app.get('/', (req, res) => {
  res.send(`✅ CRDashboard-1 is live for contributor: ${req.contributorId}`);
});

app.post('/telemetry', express.json(), (req, res) => {
  const payload = {
    contributor: req.contributorId,
    timestamp: new Date().toISOString(),
    data: req.body,
  };

  console.log('📡 Telemetry received:', JSON.stringify(payload, null, 2));
  res.status(200).json({ status: 'ok', received: payload });
});

app.get('/audit', (req, res) => {
  res.send(`📝 Audit log placeholder for ${req.contributorId}`);
});

app.listen(port, () => {
  console.log(`🚀 CRDashboard-1 running on port ${port}`);
});