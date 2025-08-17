const fs = require('fs');
const path = require('path');

const injectPath = path.join(__dirname, 'inject_all.js');
if (!fs.existsSync(injectPath)) {
  console.error('❌ inject_all.js not found.');
  process.exit(1);
}

let content = fs.readFileSync(injectPath, 'utf-8');

const previewBlock = `'preview.js': \``;
const previewStart = content.indexOf(previewBlock);
if (previewStart === -1) {
  console.error('❌ preview.js block not found in inject_all.js');
  process.exit(1);
}

const nextBlockStart = content.indexOf(`'score.js':`, previewStart);
if (nextBlockStart === -1) {
  console.error('❌ score.js block not found after preview.js');
  process.exit(1);
}

const patchedPreview = `'preview.js': \`const fs = require('fs');
const path = require('path');

const contributorId = process.argv[2];
if (!contributorId) {
  console.error('❌ Contributor ID required.');
  process.exit(1);
}

const logsDir = path.join(__dirname, '../logs');
const files = fs.readdirSync(logsDir)
  .filter(f => f.startsWith(contributorId) && f.endsWith('_modulated.json'))
  .sort((a, b) => fs.statSync(path.join(logsDir, b)).mtime - fs.statSync(path.join(logsDir, a)).mtime);

if (files.length === 0) {
  console.log(\`❌ No modulated logs found for \${contributorId}\`);
  process.exit(1);
}

const latestLog = path.join(logsDir, files[0]);
const data = JSON.parse(fs.readFileSync(latestLog));

console.log(\`🧬 Avatar UX Preview for \${contributorId}\`);
console.log('----------------------------------------');
console.log(\`💡 Sentiment: \${data.emotionalTelemetry.sentiment}\`);
console.log(\`🎯 Focus: \${data.emotionalTelemetry.focus}\`);
console.log(\`🔥 Engagement: \${data.emotionalTelemetry.engagement}\`);
console.log(\`🔌 Plugin Scores:\`);
Object.entries(data.pluginScores || {}).forEach(([key, val]) => {
  console.log(\`   - \${key}: \${val}\`);
});
console.log(\`📊 Dashboard Status: \${data.dashboard?.status}\`);
console.log('----------------------------------------');
console.log(\`🗣️ Simulated Feedback Prompt:\`);
console.log(\`   "Does this avatar feel emotionally aligned with your current goals?"\`);
\`,`;

// Replace broken preview block
const patchedContent = content.slice(0, previewStart) + patchedPreview + content.slice(nextBlockStart);
fs.writeFileSync(injectPath, patchedContent);
console.log('✅ preview.js block patched successfully in inject_all.js');