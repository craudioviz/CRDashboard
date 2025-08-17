#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
curl -s http://$CRAIVIZ_HOST_IP:5000/audit | jq '.log[] | "\(.timestamp) [\(.type)] \(.avatar): \(.emotion // .checkpoint // .score // .target // .notes // "n/a")"'
