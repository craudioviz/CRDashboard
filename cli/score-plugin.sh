#!/bin/bash
source .env

read -p "Plugin name: " plugin
read -p "Feedback (💡, 😐, ⚠️): " feedback

echo "[CRAIViz] 🧠 Scoring plugin '$plugin' with feedback '$feedback'..."

node -e "
  const scorePlugin = require('./modules/sentimentMap.js');
  const logAudit = require('./modules/audit.js');
  const result = scorePlugin('$plugin', '$feedback');
  console.log('[Sentiment]', JSON.stringify(result));
  logAudit('plugin-score', 'contrib-001', JSON.stringify(result));
"
