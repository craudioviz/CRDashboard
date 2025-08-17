#!/bin/bash
echo "🐳 Building CRAIViz Docker image..."
docker build -t craiviz-ai /mnt/c/craiviz

echo "🚀 Running CRAIViz container..."
docker run -d --name craiviz-backend \
  -p 4000:4000 \
  -v /mnt/c/craiviz:/app \
  --env-file /mnt/c/craiviz/.env \
  craiviz-ai

echo "✅ CRAIViz is live at http://localhost:4000"
