#!/bin/bash

BASE="/mnt/c/craiviz"
ASSETS="$BASE/assets"
LOGO="$ASSETS/logo"
AVATARS="$ASSETS/avatars"
CSS="$BASE/styles.css"

echo "🔍 Verifying CR AudioViz AI site structure..."
echo "--------------------------------------------------------"

# Required folders
for DIR in "$BASE" "$ASSETS" "$LOGO" "$AVATARS"; do
  if [ -d "$DIR" ]; then
    echo "[OK] Folder exists: $DIR"
  else
    echo "[MISSING] Folder: $DIR"
  fi
done

# Required HTML pages
for PAGE in "index.html" "about.html" "onboarding.html" "dashboard.html"; do
  if [ -f "$BASE/$PAGE" ]; then
    echo "[OK] Page exists: $PAGE"
  else
    echo "[MISSING] Page: $PAGE"
  fi
done

# Shared CSS
if [ -f "$CSS" ]; then
  echo "[OK] styles.css exists"
else
  echo "[MISSING] styles.css"
fi

# Logo files
for FILE in "cra-logo.webp" "cra-logo@2x.webp"; do
  if [ -f "$LOGO/$FILE" ]; then
    echo "[OK] Logo file: $FILE"
  else
    echo "[MISSING] Logo file: $FILE"
  fi
done

# Avatar files
declare -A AVATARS_MAP=(
  ["roy-ceo"]="Roy"
  ["cindy-cmo"]="Cindy"
  ["crai-strategist"]="CRAI"
  ["javari-ux"]="Javari"
  ["kairo-mentor"]="Kairo"
)

for NAME in "${!AVATARS_MAP[@]}"; do
  for SUFFIX in "" "@2x"; do
    FILE="$NAME$SUFFIX.webp"
    if [ -f "$AVATARS/$FILE" ]; then
      echo "[OK] Avatar file: $FILE"
    else
      echo "[MISSING] Avatar file: $FILE"
    fi
  done
done

echo "--------------------------------------------------------"
echo "✅ Verification complete."