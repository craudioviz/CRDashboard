#!/bin/bash

# 🚀 CRAIViz Full Orchestration Script
# ✅ Auto-sets working directory, injects all modules, logs every step

cd ~/CRAV/scripts || { echo "❌ Failed to set working directory."; exit 1; }

timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
session_id="auto_$(uuidgen)"
contributor_id="roy_henderson"

python3 launch_cli.py \
  --onboard_contributor true \
  --map_avatar true \
  --inject_emotional_telemetry true \
  --score_plugins true \
  --batch_score true \
  --launch_dashboard true \
  --validate_feedback true \
  --enable_audit_logging true \
  --timestamp "$timestamp" \
  --contributor_id "$contributor_id" \
  --session_id "$session_id"

echo "✅ CRAIViz orchestration complete for contributor: $contributor_id"
echo "🕒 Timestamp: $timestamp"
echo "📁 Session ID: $session_id"
