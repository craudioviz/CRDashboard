#!/bin/bash
echo "🩺 CRAIViz Diagnostics (Non-Privileged)"

check_module() {
  if npm list "$1" >/dev/null 2>&1; then
    echo "✅ $1 installed"
  else
    echo "❌ $1 missing — please install manually"
  fi
}

check_bin() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "✅ $1 available"
  else
    echo "❌ $1 missing — please install manually"
  fi
}

check_module multer
check_module dotenv
check_bin jq
check_bin mongo
