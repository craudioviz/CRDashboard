#!/bin/bash
echo "Uploading emotional telemetry..."
curl -X POST https://craiviz-sync-api.onrender.com/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "contributor": "Roy Henderson",
    "emotion": "energized",
    "engagement": "high",
    "modules": ["registry", "analytics", "dashboard"],
    "timestamp": "'"$(date -Iseconds)"'"
  }'
