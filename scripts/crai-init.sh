#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
mkdir -p "$ROOT/backend/controllers" "$ROOT/scripts" "$ROOT/logs" "$ROOT/config" "$ROOT/docs" "$ROOT/frontend"
cat > "$ROOT/backend/controllers/onboardController.js" <<EOC
try {
  const required = ["name", "email", "company", "goals"];
  for (const field of required) {
    if (!req.body[field]) {
      return res.status(400).json({ error: \`Missing required field: \${field}\` });
    }
  }
  const user = {
    name: req.body.name,
    email: req.body.email,
    company: req.body.company,
    goals: req.body.goals,
    timestamp: new Date().toISOString()
  };
  console.log("✅ Onboarding successful:", user);
  res.status(200).json({ message: "Onboarding complete", user });
} catch (err) {
  console.error("❌ Onboarding error:", err);
  res.status(500).json({ error: "Internal server error" });
}
EOC
echo "$TIMESTAMP | crai init: repo and controller created" >> "$LOG"
echo "✅ CRAIViz initialized at $ROOT"
