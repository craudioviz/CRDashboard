#!/bin/bash

# === CRAIViz Cloud Sync ===
# Timestamped contributor score + telemetry upload
# Logs to logs/upload.log and confirms via JSON

timestamp=$(date +"%Y-%m-%d %H:%M:%S")
payload='{
  "contributor": "Roy Henderson",
  "score": 92,
  "telemetry": {
    "emotion": "energized",
    "focus": "high",
    "friction": "none"
  },
  "timestamp": "'"$timestamp"'"
}'

echo "Uploading contributor sync payload..."
response=$(curl -s -X POST https://craiviz-sync-api.onrender.com/sync \
  -H "Content-Type: application/json" \
  -d "$payload")

echo "Response:"
echo "$response"

# Log locally
mkdir -p logs
echo "$timestamp | $response" >> logs/upload.log
