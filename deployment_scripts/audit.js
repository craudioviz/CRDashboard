const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
const rollbackDir = path.join(logsDir, 'rollback');

function summarizeLogs(dir, status) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const fullPath = path.join(dir, f);
      const data = JSON.parse(fs.readFileSync(fullPath));
      return {
        contributorId: data.contributorId || 'unknown',
        timestamp: data.dashboard?.timestamp || 'N/A',
        status,
        file: f
      };
    });
}

const activeLogs = summarizeLogs(logsDir, 'active');
const rolledBackLogs = summarizeLogs(rollbackDir, 'rolled_back');

const allLogs = [...activeLogs, ...rolledBackLogs];

console.log(`Audit Summary (${allLogs.length} logs)`);
console.log('----------------------------------------');
allLogs.forEach(log => {
  console.log(`Contributor: ${log.contributorId}`);
  console.log(`   Timestamp: ${log.timestamp}`);
  console.log(`   File: ${log.file}`);
  console.log(`   Status: ${log.status}`);
  console.log('----------------------------------------');
});