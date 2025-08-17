#!/bin/bash
set -e
ROOT="/mnt/c/craiviz"
LOG="$ROOT/logs/injection.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
FILE="$ROOT/backend/controllers/$1"
BACKUP="$FILE.bak"
[[ -z "$1" ]] && echo "❌ Error: No filename provided." && exit 1
[[ ! -f "$BACKUP" ]] && echo "❌ Error: Backup not found: $BACKUP" && exit 1
cp "$BACKUP" "$FILE"
echo "$TIMESTAMP | crai rollback: restored $1 from backup" >> "$LOG"
echo "↩️ Rollback complete: $FILE restored from $BACKUP"
