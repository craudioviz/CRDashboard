#!/bin/bash

# Absolute path to your Windows folder via WSL
BASE="/mnt/c/craiviz"
ASSETS="$BASE/assets"
LOGO="$ASSETS/logo"
AVATARS="$ASSETS/avatars"
HTML="$BASE/index.html"

echo "Verifying and healing CR AudioViz AI folder structure and files..."
echo "--------------------------------------------------------"

# Create folders if missing
for DIR in "$BASE" "$ASSETS" "$LOGO" "$AVATARS"; do
    if [ ! -d "$DIR" ]; then
        echo "[FIXED] Created missing folder: $DIR"
        mkdir -p "$DIR"
    else
        echo "[OK] Folder exists: $DIR"
    fi
done

# Logo files
for FILE in "cra-logo.webp" "cra-logo@2x.webp"; do
    TARGET="$LOGO/$FILE"
    if [ ! -f "$TARGET" ]; then
        echo "[FIXED] Created placeholder logo: $TARGET"
        convert -size 512x512 xc:gray "$TARGET"
    else
        echo "[OK] Logo file exists: $TARGET"
    fi
done

# Avatar files
declare -A AVATARS_MAP=(
    ["roy-ceo"]="Roy (CEO)"
    ["cindy-cmo"]="Cindy (CMO)"
    ["crai-strategist"]="CRAI (Strategist)"
    ["javari-ux"]="Javari (UX)"
    ["kairo-mentor"]="Kairo (Mentor)"
)

for NAME in "${!AVATARS_MAP[@]}"; do
    for SUFFIX in "" "@2x"; do
        FILE="$NAME$SUFFIX.webp"
        TARGET="$AVATARS/$FILE"
        if [ ! -f "$TARGET" ]; then
            echo "[FIXED] Created placeholder avatar: $TARGET"
            convert -size 512x512 xc:lightblue -gravity center -pointsize 24 \
                -draw "text 0,0 '${AVATARS_MAP[$NAME]}'" "$TARGET"
        else
            echo "[OK] Avatar file exists: $TARGET"
        fi
    done
done

# HTML file
if [ ! -f "$HTML" ]; then
    echo "[FIXED] Created placeholder index.html"
    cat <<EOF > "$HTML"
<!DOCTYPE html>
<html>
<head><title>CR AudioViz AI</title></head>
<body>
<h1>Welcome to CR AudioViz AI</h1>
<p>Executive avatars and logo are verified.</p>
</body>
</html>
EOF
else
    echo "[OK] index.html exists: $HTML"
fi

echo "--------------------------------------------------------"
echo "Verification and healing complete."