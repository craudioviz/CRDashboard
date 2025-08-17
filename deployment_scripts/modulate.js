const fs = require('fs');
const path = require('path');

const contributorId = process.argv[2];
if (!contributorId) {
  console.error('Contributor ID required.');
  process.exit(1);
}

const logsDir = path.join(__dirname, '../logs');
const files = fs.readdirSync(logsDir)
  .filter(f => f.startsWith(contributorId) && f.endsWith('.json') && !f.includes('_modulated'))
  .sort((a, b) => fs.statSync(path.join(logsDir, b)).mtime - fs.statSync(path.join(logsDir, a)).mtime);

if (files.length === 0) {
  console.log(`No logs found for ${contributorId}`);
  process.exit(1);
}

const latestLog = path.join(logsDir, files[0]);
const data = JSON.parse(fs.readFileSync(latestLog));

data.emotionalTelemetry.focus = Math.min(1.0, data.emotionalTelemetry.focus + 0.05);
data.emotionalTelemetry.engagement = Math.min(1.0, data.emotionalTelemetry.engagement + 0.05);
data.emotionalTelemetry.sentiment = 'inspired';
data.dashboard.status = 'modulated';

const modulatedFile = latestLog.replace('.json', '_modulated.json');
fs.writeFileSync(modulatedFile, JSON.stringify(data, null, 2));

console.log(`Modulated emotional telemetry for ${contributorId}`);
console.log(`   Focus: ${data.emotionalTelemetry.focus}`);
console.log(`   Engagement: ${data.emotionalTelemetry.engagement}`);
console.log(`   Sentiment: ${data.emotionalTelemetry.sentiment}`);
console.log(`Saved: ${modulatedFile}`);