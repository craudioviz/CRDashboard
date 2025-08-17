#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
[[ ! -f "$LOG" ]] && echo "❌ Error: Log file not found: $LOG" && exit 1
echo "📜 CRAIViz Audit Trail:"
echo "──────────────────────────────"
cat "$LOG"
echo "──────────────────────────────"
echo "✅ End of log"
