#!/bin/bash
SERVER="/mnt/c/craiviz/server.js"

echo "🔧 Patching server.js with asset and avatar routes..."

# Inject assets route if missing
if ! grep -q "const assetsRouter" "$SERVER"; then
  sed -i "/const brandingRouter/a const assetsRouter = require('./routes/assets');" "$SERVER"
  sed -i "/app.use('/branding'/a app.use('/assets', assetsRouter);" "$SERVER"
  echo "✅ Assets route injected."
else
  echo "⚠️ Assets route already present."
fi

# Inject avatar route if missing
if ! grep -q "const avatarRouter" "$SERVER"; then
  sed -i "/const brandingRouter/a const avatarRouter = require('./routes/avatar');" "$SERVER"
  sed -i "/app.use('/branding'/a app.use('/avatar', avatarRouter);" "$SERVER"
  echo "✅ Avatar route injected."
else
  echo "⚠️ Avatar route already present."
fi
