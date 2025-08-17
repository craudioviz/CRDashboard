const fs = require('fs');
const path = require('path');

const contributorId = process.argv[2];
if (!contributorId) {
 console.error('Contributor ID required.');
  process.exit(1);
}

const logsDir = path.join(__dirname, '../logs');
const files = fs.readdirSync(logsDir)
  .filter(f => f.startsWith(contributorId) && f.endsWith('.json') && !f.includes('_scored'))
  .sort((a, b) => fs.statSync(path.join(logsDir, b)).mtime - fs.statSync(path.join(logsDir, a)).mtime);

if (files.length === 0) {
  console.log(`No logs found for ${contributorId}`);
  process.exit(1);
}

const latestLog = path.join(logsDir, files[0]);
const data = JSON.parse(fs.readFileSync(latestLog));

data.pluginScores.modulation = Math.min(10, data.pluginScores.modulation + 0.3);
data.pluginScores.preview = Math.min(10, data.pluginScores.preview + 0.2);
data.pluginScores.deployment = Math.min(10, data.pluginScores.deployment + 0.4);
data.dashboard.status = 'scored';

const scoredFile = latestLog.replace('.json', '_scored.json');
fs.writeFileSync(scoredFile, JSON.stringify(data, null, 2));

console.log(`Plugin scores updated for ${contributorId}`);
console.log(`Saved: ${scoredFile}`);