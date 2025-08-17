const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('❌ Contributor name missing.');
  process.exit(1);
}

// Paths
const scriptPath = path.join('cli', 'contributors', `${name}.sh`);
const logDir = path.join('backend', 'logs');
const registryPath = path.join('backend', 'data', 'contributors.json');
const avatarPath = path.join('avatars', name, 'avatar.json');
const assetDir = path.join('assets', name);
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logPath = path.join(logDir, `onboard_${name}_${timestamp}.json`);

// Ensure directories
fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
fs.mkdirSync(logDir, { recursive: true });
fs.mkdirSync(path.dirname(avatarPath), { recursive: true });
fs.mkdirSync(assetDir, { recursive: true });

// Create shell script
const shellScript = `#!/bin/bash
# Contributor script for ${name}
echo "👋 Hello, ${name}! Your CLI module is ready."
`;
fs.writeFileSync(scriptPath, shellScript, { mode: 0o755 });

// Create avatar scaffold
const avatar = {
  name: name.charAt(0).toUpperCase() + name.slice(1),
  role: "Contributor",
  style: "modular, emotionally intelligent",
  status: "active",
  created: new Date().toISOString()
};
fs.writeFileSync(avatarPath, JSON.stringify(avatar, null, 2));

// Update registry
let registry = {};
try {
  registry = JSON.parse(fs.readFileSync(registryPath));
} catch {
  console.warn('⚠️ Creating new contributor registry.');
}
registry[name] = {
  joined: new Date().toISOString(),
  script: scriptPath,
  avatar: avatarPath,
  assets: assetDir,
  status: "active"
};
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

// Write log
const log = {
  contributor: name,
  created: new Date().toISOString(),
  script: scriptPath,
  avatar: avatarPath,
  assets: assetDir,
  registry: registryPath,
  status: "✅ onboarded"
};
fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

// Output
console.log(`✅ ${name}.sh created at ${scriptPath}`);
console.log(`📝 Log written to ${logPath}`);
console.log(`📇 Contributor ${name} registered in ${registryPath}`);
console.log(`🧬 Avatar scaffolded at ${avatarPath}`);
console.log(`📦 Asset directory ready at ${assetDir}`);
