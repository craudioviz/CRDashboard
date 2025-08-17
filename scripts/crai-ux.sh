#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
FILE="$ROOT/backend/controllers/$1"
BACKUP="$FILE.bak"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
[[ -z "$1" ]] && echo "❌ Error: No filename provided." && exit 1
[[ ! -f "$FILE" ]] && echo "❌ Error: File not found: $FILE" && exit 1
cp "$FILE" "$BACKUP"
BLOCK='    // 🌟 Emotional UX capture
    const avatar = req.body.avatar || "default";
    const mood = req.body.mood || "neutral";
    const uxMeta = {
      avatar,
      mood,
      timestamp: new Date().toISOString(),
      context: "onboarding"
    };
    console.log("🧠 UX Context:", uxMeta);'
awk -v pat="const user =" -v blk="$BLOCK" '
  $0 ~ pat {
    print blk;
    print;
    next
  }
  { print }
' "$BACKUP" > "$FILE"
echo "$TIMESTAMP | crai ux: emotional UX injected into $1" >> "$LOG"
echo "💫 Emotional UX injected into $FILE"
