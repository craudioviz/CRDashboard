#!/bin/bash
cd /mnt/c/craiviz

# Create env
cat > craiviz-env.sh << 'EOL'
#!/bin/bash
cd /mnt/c/craiviz
export CRAIVIZ_HOME="/mnt/c/craiviz"
export CRAIVIZ_HOST_IP=$(ip route | grep default | awk '{print $3}')
export CRAIVIZ_AVATAR="ModuloMuse"
export CRAIVIZ_TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
EOL

# Dashboard renderer
cat > render_dashboard.sh << 'EOL'
#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
curl -s http://$CRAIVIZ_HOST_IP:5000/audit | jq '.log[] | "\(.timestamp) [\(.type)] \(.avatar): \(.emotion // .checkpoint // .score // .target // .notes // "n/a")"'
EOL

# Avatar mapper
cat > map_avatar.sh << 'EOL'
#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
echo "Avatar: $CRAIVIZ_AVATAR"
echo "Emotion Profile: curious, adaptive, resonant"
echo "Contributor ID: CRAI-001"
EOL

# Sentiment scorer
cat > sentiment.sh << 'EOL'
#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
echo "Scoring emotional payload for $CRAIVIZ_AVATAR..."
echo "Resonance: 9.2"
echo "Engagement: high"
EOL

# Deploy dashboard
cat > deploy_dashboard.sh << 'EOL'
#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/deploy \
  -H "Content-Type: application/json" \
  -d "{\"avatar\":\"$CRAIVIZ_AVATAR\",\"target\":\"dashboard\"}"
EOL

# Patch CLI
cat > craiviz-cli.sh << 'EOL'
#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
HEALTH=$(curl -s --connect-timeout 2 http://$CRAIVIZ_HOST_IP:5000/health | jq -r .status)

if [ "$HEALTH" != "alive" ]; then
  echo "[✗] Server not reachable at $CRAIVIZ_HOST_IP:5000"
  exit 1
fi

echo "[✓] Server is alive at $CRAIVIZ_HOST_IP:5000"
echo "Choose an action:"
select opt in "Modulate" "Rollback" "Audit" "Feedback" "Deploy" "Dashboard" "Avatar" "Sentiment" "Exit"; do
  case $opt in
    "Modulate") ./modulate.sh; break ;;
    "Rollback") ./rollback.sh; break ;;
    "Audit") ./audit.sh; break ;;
    "Feedback") ./feedback.sh; break ;;
    "Deploy") ./deploy_dashboard.sh; break ;;
    "Dashboard") ./render_dashboard.sh; break ;;
    "Avatar") ./map_avatar.sh; break ;;
    "Sentiment") ./sentiment.sh; break ;;
    "Exit") break ;;
    *) echo "Invalid option";;
  esac
done
EOL

# Patch Makefile
cat > Makefile << 'EOL'
serve:
	@bash craiviz-cli.sh

dashboard:
	@bash render_dashboard.sh

avatar:
	@bash map_avatar.sh

sentiment:
	@bash sentiment.sh
EOL

# Make everything executable
chmod +x *.sh

echo "[✓] CRAIViz orchestration suite injected and ready."
