#!/bin/bash
echo "🧪 Uploading test asset..."
curl -s -X POST http://localhost:4000/assets/upload \
  -F "file=@/mnt/c/craiviz/public/assets/branding.json" | jq . || echo "❌ Upload failed"

echo "🧪 Listing uploaded assets..."
curl -s http://localhost:4000/assets/list | jq . || echo "❌ List failed"

echo "🧠 Fetching avatar persona..."
curl -s http://localhost:4000/avatar/visionary | jq . || echo "❌ Avatar fetch failed"
