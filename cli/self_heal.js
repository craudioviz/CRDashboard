const fs = require('fs');
const path = require('path');

const required = [
  'cli/contributors/roy.sh',
  'avatars/roy/avatar.json',
  'avatars/roy/hooks.json',
  'backend/data/contributors.json'
];

required.forEach(p => {
  if (!fs.existsSync(p)) {
    console.warn(`🩹 Missing ${p}, attempting recovery...`);
    // Recovery logic could go here
  }
});
