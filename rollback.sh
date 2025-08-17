#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/rollback \
  -H "Content-Type: application/json" \
  -d "{\"avatar\":\"$CRAIVIZ_AVATAR\",\"target\":\"rollback\",\"notes\":\"restore previous state\"}"
