#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
FILE="$ROOT/backend/controllers/$1"
[[ -z "$1" ]] && echo "❌ Error: No filename provided." && exit 1
[[ ! -f "$FILE" ]] && echo "❌ Error: File not found: $FILE" && exit 1
gnome-terminal -- bash -c "tail -f '$LOG'; exec bash"
gnome-terminal -- bash -c "code '$FILE'; exec bash"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "$TIMESTAMP | crai preview: launched log + editor for $1" >> "$LOG"
echo "🧪 Preview launched for $FILE"
