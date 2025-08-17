const fs = require('fs');
const path = require('path');

const scripts = {
  'orchestrate.js': `const fs = require('fs');
const path = require('path');
const axios = require('axios');

const contributorId = process.argv[2] || 'default_contributor';
const timestamp = new Date().toISOString();
const logPath = path.join(__dirname, \`../logs/\${contributorId}_\${Date.now()}.json\`);

const payload = {
  contributorId,
  emotionalTelemetry: {
    focus: 0.92,
    engagement: 0.87,
    sentiment: 'energized'
  },
  pluginScores: {
    modulation: 9.5,
    preview: 9.2,
    deployment: 9.8
  },
  dashboard: {
    status: 'rendered',
    timestamp
  }
};

const cloudEndpoint = 'http://localhost:10000/sync';

async function orchestrate() {
  try {
    console.log(\`Orchestrating for \${contributorId}...\`);
    fs.writeFileSync(logPath, JSON.stringify(payload, null, 2));
    console.log(\`Local log saved: \${logPath}\`);
    const res = await axios.post(cloudEndpoint, payload);
    console.log(\`Cloud sync response: \${res.status} \${res.statusText}\`);
  } catch (err) {
    console.error('Orchestration failed:', err.message);
  }
}

orchestrate();`,

  'dashboard.js': `const fs = require('fs');
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

console.log(\`Dashboard Preview for \${data.contributorId}\`);
console.log('----------------------------------------');
console.log(\`Timestamp: \${data.dashboard?.timestamp || 'N/A'}\`);
console.log('Emotional Telemetry:');
console.log(\`   - Focus: \${data.emotionalTelemetry?.focus}\`);
console.log(\`   - Engagement: \${data.emotionalTelemetry?.engagement}\`);
console.log(\`   - Sentiment: \${data.emotionalTelemetry?.sentiment}\`);
console.log('Plugin Scores:');
Object.entries(data.pluginScores || {}).forEach(([key, val]) => {
  console.log(\`   - \${key}: \${val}\`);
});
console.log(\`Dashboard Status: \${data.dashboard?.status}\`);
console.log('----------------------------------------');`,

  'rollback.js': `const fs = require('fs');
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
  console.log(\`No logs found for \${contributorId}\`);
  process.exit(1);
}

const latestLog = files[0];
const srcPath = path.join(logsDir, latestLog);
const destPath = path.join(rollbackDir, latestLog);

fs.renameSync(srcPath, destPath);
console.log(\`Rolled back \${latestLog} → \${destPath}\`);`,

  'audit.js': `const fs = require('fs');
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

console.log(\`Audit Summary (\${allLogs.length} logs)\`);
console.log('----------------------------------------');
allLogs.forEach(log => {
  console.log(\`Contributor: \${log.contributorId}\`);
  console.log(\`   Timestamp: \${log.timestamp}\`);
  console.log(\`   File: \${log.file}\`);
  console.log(\`   Status: \${log.status}\`);
  console.log('----------------------------------------');
});`,

  'modulate.js': `const fs = require('fs');
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
  console.log(\`No logs found for \${contributorId}\`);
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

console.log(\`Modulated emotional telemetry for \${contributorId}\`);
console.log(\`   Focus: \${data.emotionalTelemetry.focus}\`);
console.log(\`   Engagement: \${data.emotionalTelemetry.engagement}\`);
console.log(\`   Sentiment: \${data.emotionalTelemetry.sentiment}\`);
console.log(\`Saved: \${modulatedFile}\`);`,

  'preview.js': `const fs = require('fs');
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
  console.log(\`No modulated logs found for \${contributorId}\`);
  process.exit(1);
}

const latestLog = path.join(logsDir, files[0]);
const data = JSON.parse(fs.readFileSync(latestLog));

console.log(\`Avatar UX Preview for \${contributorId}\`);
console.log('----------------------------------------');
console.log(\`Sentiment: \${data.emotionalTelemetry.sentiment}\`);
console.log(\`Focus: \${data.emotionalTelemetry.focus}\`);
console.log(\`Engagement: \${data.emotionalTelemetry.engagement}\`);
console.log('Plugin Scores:');
Object.entries(data.pluginScores || {}).forEach(([key, val]) => {
  console.log(\`   - \${key}: \${val}\`);
});
console.log(\`Dashboard Status: \${data.dashboard?.status}\`);
console.log('----------------------------------------');
console.log('Feedback Prompt:');
console.log('   "Does this avatar feel emotionally aligned with your current goals?"');`,

  'score.js': `const fs = require('fs');
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
  console.log(\`No logs found for \${contributorId}\`);
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

console.log(\`Plugin scores updated for \${contributorId}\`);
console.log(\`Saved: \${scoredFile}\`);
`
};

// ✅ Injection loop
const targetDir = path.join(__dirname);
Object.entries(scripts).forEach(([filename, content]) => {
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, content.trim());
  console.log(`Injected ${filename}`);
});
