#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/feedback \
  -H "Content-Type: application/json" \
  -d "{\"avatar\":\"$CRAIVIZ_AVATAR\",\"emotion\":\"curious\",\"notes\":\"UX preview validated\"}"
