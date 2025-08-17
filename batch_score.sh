#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/score/batch \
  -H "Content-Type: application/json" \
  -d '{"batch":[{"avatar":"ModuloMuse","score":9.1},{"avatar":"ModuloMuse","score":8.7}]}'
