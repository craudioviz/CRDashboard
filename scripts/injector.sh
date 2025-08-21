#!/bin/bash
set -e

injectBlock() {
  local target="$1"
  local pattern="$2"
  local block="$3"
  local resolved=$(realpath "$target" 2>/dev/null || echo "")
  local backup="${resolved}.bak"
  local log="logs/injection.log"
  local timestamp=$(date +"%Y-%m-%d %H:%M:%S")

  # 🛡 Validate path
  if [[ ! -f "$resolved" ]]; then
    echo "❌ Target file not found: $target"
    echo "🔍 Current dir: $(pwd)"
    echo "📁 Try relative path like: ../backend/controllers/onboardController.js"
    return 1
  fi

  # ⏱ Backup original
  cp "$resolved" "$backup"

  # 🧠 Inject block after pattern
  awk -v pat="$pattern" -v blk="$block" '
    $0 ~ pat {
      print;
      split(blk, lines, "\\n");
      for (i in lines) print lines[i];
      next
    }
    { print }
  ' "$backup" > "$resolved"

  # 📝 Log injection
  mkdir -p logs
  echo "$timestamp | Injected block after '$pattern' into $resolved" >> "$log"
  echo "✅ Block injected into $resolved"
}

# 🧪 Example usage
injectBlock "$1" "$2" "$3"
