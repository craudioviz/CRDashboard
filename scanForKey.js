// scanForKey.js
const fs = require('fs');
const path = require('path');

const patterns = [
  /api[_-]?key\s*[:=]\s*['"]?[\w\-]{16,}['"]?/i,
  /sk_live_[\w\-]{24,}/i,
  /Bearer\s+[\w\-\.]+/i,
  /token\s*[:=]\s*['"]?[\w\-\.]{16,}['"]?/i
];

const scanDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      patterns.forEach(pattern => {
        const match = content.match(pattern);
        if (match) {
          console.log(`🔐 Match in ${fullPath}`);
          console.log(`→ ${match[0]}`);
          console.log(`🕒 Timestamp: ${new Date().toISOString()}`);
          console.log(`👤 Contributor: Roy Henderson\n`);
        }
      });
    }
  });
};

scanDir(process.cwd());