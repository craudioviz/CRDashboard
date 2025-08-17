#!/bin/bash
echo "Uploading contributor registry..."
curl -X POST https://craiviz-sync-api.onrender.com/registry \
  -H "Content-Type: application/json" \
  -d '{
    "contributor": "Roy Henderson",
    "role": "Founder & CEO",
    "modules": ["onboarding", "telemetry", "dashboard", "sync"],
    "emotion": "energized",
    "timestamp": "'"$(date -Iseconds)"'"
  }'
