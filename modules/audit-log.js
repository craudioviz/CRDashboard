const fs = require('fs');
const path = require('path');

function logAudit({ route, contributor, payload }) {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp.replace(/[:.]/g, '-')}_${route}_${contributor}.json`;
  const filepath = path.join(__dirname, '../logs', filename);

  const entry = {
    route,
    contributor,
    timestamp,
    payload
  };

  fs.writeFile(filepath, JSON.stringify(entry, null, 2), (err) => {
    if (err) {
      console.error(`❌ Audit log failed for ${route}:`, err);
    } else {
      console.log(`📝 Audit log saved: ${filename}`);
    }
  });
}

module.exports = logAudit;