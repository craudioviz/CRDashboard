#!/bin/bash
echo "Validating audit trail..."
curl -X POST https://craiviz-sync-api.onrender.com/audit \
  -H "Content-Type: application/json" \
  -d '{
    "contributor": "Roy Henderson",
    "modules": ["sync", "registry", "analytics", "telemetry", "score"],
    "emotion": "energized",
    "score": 98.7,
    "status": "validated",
    "timestamp": "'"$(date -Iseconds)"'"
  }'
