#!/bin/bash
# onboard_contributor.sh — Smart CRAIViz onboarding launcher

username="$1"

if [ -z "$username" ]; then
  echo "❌ Usage: ./onboard_contributor.sh <username>"
  exit 1
fi

if command -v node >/dev/null 2>&1; then
  echo "🧠 Node.js detected. Running onboarding via Node..."
  node backend/hooks/onboard_contributor.js "$username"
else
  echo "❌ Node.js not found. Please install Node to run onboarding."
  exit 1
fi
