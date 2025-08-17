// onboard_contributor.js — CRAIViz contributor onboarding hook

const fs = require('fs');
const path = require('path');

module.exports = function onboardContributor(username) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logPath = path.join(__dirname, '../logs', `onboard_${username}_${timestamp}.log`);
  const cliTemplate = path.join(__dirname, '../../cli/contributors', `${username}.sh`);

  const log = (msg) => {
    fs.appendFileSync(logPath, `[${new Date().toLocaleTimeString()}] ${msg}\n`);
  };

  log(`🚀 Onboarding contributor: ${username}`);

  // Inject CLI template
  const template = `#!/bin/bash\n# ${username}.sh — Contributor CLI\nbash craiviz_orchestrate.sh\n`;
  fs.writeFileSync(cliTemplate, template);
  fs.chmodSync(cliTemplate, 0o755);
  log(`✅ CLI injected: ${cliTemplate}`);

  // Snapshot for rollback
  const backupDir = path.join(__dirname, '../../backups', `${username}_${timestamp}`);
  fs.mkdirSync(backupDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, '../../frontend/App.jsx'), path.join(backupDir, 'App.jsx'));
  log(`📦 Snapshot created: ${backupDir}`);

  log(`🎯 Onboarding complete.`);
};
