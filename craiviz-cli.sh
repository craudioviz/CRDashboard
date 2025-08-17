#!/bin/bash
cd /mnt/c/craiviz
source craiviz-env.sh
pgrep -f "app.py" > /dev/null || {
  echo "[↻] Flask not running—launching now..."
  nohup python3 app.py > flask.log 2>&1 &
  sleep 2
}
HEALTH=$(curl -s --connect-timeout 2 http://$CRAIVIZ_HOST_IP:5000/health | jq -r .status)
if [ "$HEALTH" != "alive" ]; then
  echo "[✗] Server not reachable at $CRAIVIZ_HOST_IP:5000"
  exit 1
fi
echo "[✓] Server is alive at $CRAIVIZ_HOST_IP:5000"
echo "Choose an action:"
select opt in "Modulate" "Rollback" "Audit" "Feedback" "Deploy" "Dashboard" "Avatar" "Sentiment" "Contributor" "Scaffold" "BatchScore" "Sync" "Exit"; do
  case $opt in
    "Modulate") ./modulate.sh; break ;;
    "Rollback") ./rollback.sh; break ;;
    "Audit") ./render_dashboard.sh; break ;;
    "Feedback") ./feedback.sh; break ;;
    "Deploy") ./deploy_dashboard.sh; break ;;
    "Dashboard") ./render_dashboard.sh; break ;;
    "Avatar") ./map_avatar.sh; break ;;
    "Sentiment") ./sentiment.sh; break ;;
    "Contributor") ./register_contributor.sh; break ;;
    "Scaffold") ./scaffold_avatar.sh; break ;;
    "BatchScore") ./batch_score.sh; break ;;
    "Sync") ./sync_payload.sh; break ;;
    "Exit") break ;;
    *) echo "Invalid option";;
  esac
done
