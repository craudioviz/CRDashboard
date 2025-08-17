const fs = require('fs');
module.exports = function logAudit(action, contributorId, context) {
  const timestamp = new Date().toISOString();
  const entry = `${timestamp} | ${action} | ${contributorId} | ${context}\n`;
  fs.appendFileSync('logs/audit.log', entry);
};
