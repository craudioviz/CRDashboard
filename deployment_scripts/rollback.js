const fs = require('fs');
const path = require('path');

const contributorId = process.argv[2];
if (!contributorId) {
  console.error('Contributor ID required.');
  process.exit(1);
}

const logsDir = path.join(__dirname, '../logs');
const rollbackDir = path.join(logsDir, 'rollback');
if (!fs.existsSync(rollbackDir)) {
  fs.mkdirSync(rollbackDir);
}

const files = fs.readdirSync(logsDir)
  .filter(f => f.startsWith(contributorId) && f.endsWith('.json'))
  .sort((a, b) => fs.statSync(path.join(logsDir, b)).mtime - fs.statSync(path.join(logsDir, a)).mtime);

if (files.length === 0) {
  console.log(`No logs found for ${contributorId}`);
  process.exit(1);
}

const latestLog = files[0];
const srcPath = path.join(logsDir, latestLog);
const destPath = path.join(rollbackDir, latestLog);

fs.renameSync(srcPath, destPath);
console.log(`Rolled back ${latestLog} → ${destPath}`);