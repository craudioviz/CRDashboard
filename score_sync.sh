#!/bin/bash
echo "Uploading contributor score..."
curl -X POST https://craiviz-sync-api.onrender.com/score \
  -H "Content-Type: application/json" \
  -d '{
    "contributor": "Roy Henderson",
    "score": 98.7,
    "modules": ["telemetry", "registry", "analytics", "dashboard"],
    "emotion": "focused",
    "timestamp": "'"$(date -Iseconds)"'"
  }'
