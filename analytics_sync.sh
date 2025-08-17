#!/bin/bash
echo "Uploading dashboard analytics..."
curl -X POST https://craiviz-sync-api.onrender.com/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "contributor": "Roy Henderson",
    "dashboard": "roy.html",
    "modules": ["telemetry", "registry", "sync"],
    "emotion": "focused",
    "score": 98.7,
    "timestamp": "'"$(date -Iseconds)"'"
  }'
