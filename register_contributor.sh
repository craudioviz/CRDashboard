#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/contributor \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"CRAI-001\",\"role\":\"orchestrator\",\"emotion\":\"focused\"}"
