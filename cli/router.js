const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const contributorsDir = path.join(__dirname, 'contributors');
const contributors = fs.readdirSync(contributorsDir).filter(f => f.endsWith('.sh') && f !== '.sh');

contributors.forEach(script => {
  const fullPath = path.join(contributorsDir, script);
  console.log(`🚀 Executing ${script}`);
  execSync(`bash ${fullPath}`, { stdio: 'inherit' });
});
