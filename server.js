const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// ✅ Root route for live status
app.get('/', (req, res) => {
  res.json({
    status: "CRAIViz orchestration engine live",
    timestamp: new Date().toISOString(),
    audit_mode: process.env.AUDIT_MODE === "true",
    contributor: process.env.CONTRIBUTOR_ID || "unknown"
  });
});

// 🔧 Orchestration routes
app.post('/preview', require('./deployment_scripts/preview'));
app.post('/dashboard', require('./deployment_scripts/dashboard'));
app.post('/inject/avatar', require('./deployment_scripts/inject_all'));

// 🧠 Optional: Add more routes as needed
// app.post('/rollback', require('./deployment_scripts/rollback'));
// app.post('/score', require('./deployment_scripts/score'));

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 CRAIViz Sync API live on assigned port: ${PORT}`);
});