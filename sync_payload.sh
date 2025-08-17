#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/sync \
  -H "Content-Type: application/json" \
  -d "{\"avatar\":\"$CRAIVIZ_AVATAR\",\"timestamp\":\"$CRAIVIZ_TIMESTAMP\",\"notes\":\"sync placeholder\"}"
