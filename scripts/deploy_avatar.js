const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('❌ Avatar name missing.');
  process.exit(1);
}

const hooksPath = path.join('avatars', name, 'hooks.json');
if (!fs.existsSync(hooksPath)) {
  console.error('❌ No hooks found for avatar:', name);
  process.exit(1);
}

const hooks = JSON.parse(fs.readFileSync(hooksPath));
hooks.deployment = 'live';
hooks.last_updated = new Date().toISOString();

fs.writeFileSync(hooksPath, JSON.stringify(hooks, null, 2));
console.log(`🚀 Avatar ${name} deployed.`);
