const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
const files = fs.readdirSync(logsDir)
  .filter(f => f.endsWith('.json'))
  .sort((a, b) => fs.statSync(path.join(logsDir, b)).mtime - fs.statSync(path.join(logsDir, a)).mtime);

if (files.length === 0) {
  console.log('No logs found.');
  process.exit(1);
}

const latestLog = path.join(logsDir, files[0]);
const data = JSON.parse(fs.readFileSync(latestLog));

console.log(`Dashboard Preview for ${data.contributorId}`);
console.log('----------------------------------------');
console.log(`Timestamp: ${data.dashboard?.timestamp || 'N/A'}`);
console.log('Emotional Telemetry:');
console.log(`   - Focus: ${data.emotionalTelemetry?.focus}`);
console.log(`   - Engagement: ${data.emotionalTelemetry?.engagement}`);
console.log(`   - Sentiment: ${data.emotionalTelemetry?.sentiment}`);
console.log('Plugin Scores:');
Object.entries(data.pluginScores || {}).forEach(([key, val]) => {
  console.log(`   - ${key}: ${val}`);
});
console.log(`Dashboard Status: ${data.dashboard?.status}`);
console.log('----------------------------------------');