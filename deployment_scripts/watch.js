const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const logsDir = path.join(__dirname, '../logs');
const logFile = path.join(__dirname, '../logs/watch.log');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function logEvent(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}`;
  console.log(entry);
  fs.appendFileSync(logFile, entry + '\n');
}

function runScript(scriptName, contributorId) {
  const scriptPath = path.join(__dirname, scriptName);
  const proc = spawn('node', [scriptPath, contributorId]);

  proc.stdout.on('data', data => process.stdout.write(data));
  proc.stderr.on('data', data => process.stderr.write(data));
  proc.on('exit', code => {
    logEvent(`Executed ${scriptName} for ${contributorId} (exit ${code})`);
  });
}

fs.watch(logsDir, { recursive: false }, (eventType, filename) => {
  if (!filename || !filename.endsWith('.json')) return;

  const fullPath = path.join(logsDir, filename);
  if (!fs.existsSync(fullPath)) return;

  try {
    const data = JSON.parse(fs.readFileSync(fullPath));
    const contributorId = data.contributorId || 'unknown';
    const status = data.dashboard?.status || 'unknown';

    logEvent(`Detected ${filename} → contributor: ${contributorId}, status: ${status}`);

    if (filename.includes('_modulated')) {
      runScript('preview.js', contributorId);
    } else {
      runScript('dashboard.js', contributorId);
    }
  } catch (err) {
    logEvent(`Error parsing ${filename}: ${err.message}`);
  }
});

logEvent('watch.js started — monitoring logs/ for changes...');