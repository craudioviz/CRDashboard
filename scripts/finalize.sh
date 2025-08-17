#!/bin/bash
echo "🚀 CRAIViz Finalization (Non-Privileged)"

SERVER="/mnt/c/craiviz/server.js"

# Patch server.js
echo "🔧 Patching server.js..."
grep -q "const avatarStateRouter" "$SERVER" || \
  sed -i "/const brandingRouter/a const avatarStateRouter = require('./routes/avatar-state');" "$SERVER"

grep -q "app.use('/avatar-state'" "$SERVER" || \
  sed -i "/app.use('/branding', brandingRouter);/a app.use('/avatar-state', avatarStateRouter);" "$SERVER"

# Confirm modules
for module in multer dotenv; do
  npm list "$module" >/dev/null 2>&1 && echo "✅ $module installed" || echo "❌ $module missing"
done

# Confirm CLI tools
for bin in jq mongo; do
  command -v "$bin" >/dev/null 2>&1 && echo "✅ $bin available" || echo "❌ $bin missing"
done

echo "🎯 Finalization complete — no elevation required."
