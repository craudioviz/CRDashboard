const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contributors = ['roy', 'alex', 'jordan', 'casey'];

contributors.forEach(name => {
  console.log(`🚀 Onboarding ${name}...`);
  execSync(`node scripts/onboard_contributor.js ${name}`, { stdio: 'inherit' });
});
