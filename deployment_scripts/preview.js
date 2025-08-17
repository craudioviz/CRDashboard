const fs = require('fs');
const path = require('path');

const contributorId = process.argv[2];
if (!contributorId) {
  console.error('Contributor ID required.');
  process.exit(1);
}

const logsDir = path.join(__dirname, '../logs');
const files = fs.readdirSync(logsDir)
  .filter(f => f.startsWith(contributorId) && f.endsWith('_modulated.json'))
  .sort((a, b) => fs.statSync(path.join(logsDir, b)).mtime - fs.statSync(path.join(logsDir, a)).mtime);

if (files.length === 0) {
  console.log(`No modulated logs found for ${contributorId}`);
  process.exit(1);
}

const latestLog = path.join(logsDir, files[0]);
const data = JSON.parse(fs.readFileSync(latestLog));

console.log(`Avatar UX Preview for ${contributorId}`);
console.log('----------------------------------------');
console.log(`Sentiment: ${data.emotionalTelemetry.sentiment}`);
console.log(`Focus: ${data.emotionalTelemetry.focus}`);
console.log(`Engagement: ${data.emotionalTelemetry.engagement}`);
console.log('Plugin Scores:');
Object.entries(data.pluginScores || {}).forEach(([key, val]) => {
  console.log(`   - ${key}: ${val}`);
});
console.log(`Dashboard Status: ${data.dashboard?.status}`);
console.log('----------------------------------------');
console.log('Feedback Prompt:');
console.log('   "Does this avatar feel emotionally aligned with your current goals?"');