#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
SNAP="$ROOT/logs/checkpoint-$(date +"%Y%m%d-%H%M%S").log"
echo "📦 Snapshotting CRAIViz repo..."
tree "$ROOT" > "$SNAP"
echo "$(date +"%Y-%m-%d %H:%M:%S") | crai checkpoint: saved to $SNAP" >> "$LOG"
echo "✅ Checkpoint saved: $SNAP"
