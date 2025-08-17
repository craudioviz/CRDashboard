#!/bin/bash
echo "🛠️ CRAIViz Repair Script Initiated..."

# ✅ Fix 1: Correct MongoDB install
echo "📦 Checking for MongoDB CLI..."
if ! command -v mongo >/dev/null 2>&1; then
  echo "❌ mongo missing — installing mongodb-clients..."
  sudo apt update && sudo apt install mongodb-clients -y
else
  echo "✅ mongo available"
fi

# ✅ Fix 2: Patch server.js route injection
SERVER="/mnt/c/craiviz/server.js"

echo "🔧 Patching server.js for avatar-state route..."
if ! grep -q "const avatarStateRouter" "$SERVER"; then
  sed -i "/const brandingRouter/a const avatarStateRouter = require('./routes/avatar-state');" "$SERVER"
  echo "✅ avatarStateRouter require() injected"
else
  echo "⚠️ avatarStateRouter already present"
fi

if ! grep -q "app.use('/avatar-state'" "$SERVER"; then
  sed -i "/app.use('/branding', brandingRouter);/a app.use('/avatar-state', avatarStateRouter);" "$SERVER"
  echo "✅ app.use('/avatar-state') injected"
else
  echo "⚠️ app.use('/avatar-state') already present"
fi

# ✅ Fix 3: Confirm required modules
echo "🔍 Verifying Node modules..."
for module in multer dotenv; do
  if npm list "$module" >/dev/null 2>&1; then
    echo "✅ $module installed"
  else
    echo "❌ $module missing — installing..."
    npm install "$module"
  fi
done

# ✅ Fix 4: Confirm CLI tools
for bin in jq mongo; do
  if command -v "$bin" >/dev/null 2>&1; then
    echo "✅ $bin available"
  else
    echo "❌ $bin missing — manual install may be required"
  fi
done

echo "🎯 CRAIViz Repair Complete."
