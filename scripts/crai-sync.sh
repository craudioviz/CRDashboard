#!/bin/bash

echo "🔁 Triggering CRAIViz Sync API..."

RESPONSE=$(curl --verbose --max-time 10 -s -X POST https://craiviz-sync-api.onrender.com/api/sync \
  -H "Content-Type: application/json" \
  -d '{"trigger":"cli-sync","timestamp":"'"$(date -u)"'"}')

echo "✅ Raw Response:"
echo "$RESPONSE"

# Extract timestamp
TIMESTAMP=$(echo "$RESPONSE" | grep -oP '(?<="timestamp":")[^"]+')

# Log locally
LOG_ENTRY="{\"timestamp\":\"$TIMESTAMP\",\"trigger\":\"cli-sync\",\"source\":\"crai-sync.sh\"}"
echo "$LOG_ENTRY" >> logs/cloud_sync.log

echo "📁 Log entry appended to logs/cloud_sync.log"