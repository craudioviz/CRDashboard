#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
FILE="$ROOT/backend/controllers/$1"
BACKUP="$FILE.bak"
[[ -z "$1" ]] && echo "❌ Error: No filename provided." && exit 1
[[ ! -f "$FILE" ]] && echo "❌ Error: File not found: $FILE" && exit 1
cp "$FILE" "$BACKUP"
BLOCK='    const required = ["name", "email", "company", "goals"];
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }'
awk -v pat="try {" -v blk="$BLOCK" '
  $0 ~ pat {
    print;
    split(blk, lines, "\n");
    for (i in lines) print lines[i];
    next
  }
  { print }
' "$BACKUP" > "$FILE"
echo "$TIMESTAMP | crai inject: validation injected into $1" >> "$LOG"
echo "✅ Validation injected into $FILE"
