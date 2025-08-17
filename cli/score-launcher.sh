#!/bin/bash

# === CRAIViz Scoring Launcher ===
clear
echo "🚀 CRAIViz Plugin Scoring CLI"
echo "-----------------------------"
echo "1. Score single plugin"
echo "2. Run batch scoring"
echo "3. View score dashboard"
echo "4. Suggest feedback"
echo "5. Exit"
echo ""

read -p "Select an option [1-5]: " choice

case "$choice" in
  1) bash cli/score-plugin.sh ;;
  2) bash cli/score-batch.sh ;;
  3) bash cli/score-dashboard.sh ;;
  4) bash cli/score-feedback.sh ;;
  5) echo "👋 Exiting CRAIViz CLI"; exit 0 ;;
  *) echo "⚠️ Invalid option"; sleep 1; bash cli/score-launcher.sh ;;
esac
