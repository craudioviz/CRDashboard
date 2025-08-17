const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('❌ Contributor name missing.');
  process.exit(1);
}

const paths = [
  path.join('cli', 'contributors', `${name}.sh`),
  path.join('avatars', name, 'avatar.json'),
  path.join('assets', name),
];

paths.forEach(p => {
  try {
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`🗑️ Removed ${p}`);
    }
  } catch (e) {
    console.error(`❌ Failed to remove ${p}:`, e.message);
  }
});

// Update registry
const registryPath = path.join('backend', 'data', 'contributors.json');
try {
  const registry = JSON.parse(fs.readFileSync(registryPath));
  delete registry[name];
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log(`📉 Removed ${name} from registry`);
} catch (e) {
  console.error('❌ Failed to update registry:', e.message);
}
