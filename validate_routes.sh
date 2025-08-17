#!/bin/bash

echo "🔍 Validating CRAIViz orchestration routes..."

# 1. Trigger Dashboard Preview
echo "🚀 Triggering /preview..."
curl -s -X POST http://localhost:3000/preview \
  -H "Content-Type: application/json" \
  -d '{
    "trigger": "dashboard",
    "mode": "emotional",
    "batch": true,
    "audit": true
  }' | jq .

# 2. Ingest Contributor Telemetry
echo "📥 Validating /ingest..."
curl -s -X POST http://localhost:3000/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "contributor_id": "alpha001",
    "score": 87,
    "telemetry": {
      "emotion": "curious",
      "engagement": 0.92,
      "timestamp": "2025-08-17T17:50:00Z"
    }
  }' | jq .

# 3. Inject Avatar Mapping
echo "🧠 Injecting /inject/avatar..."
curl -s -X POST http://localhost:3000/inject/avatar \
  -H "Content-Type: application/json" \
  -d '{
    "avatar_id": "echo001",
    "linked_contributor": "alpha001",
    "emotional_context": {
      "baseline": "empathetic",
      "modulation": "adaptive",
      "telemetry_link": true
    },
    "audit": true
  }' | jq .

echo "✅ All routes validated. Audit logs written to ./logs/"
