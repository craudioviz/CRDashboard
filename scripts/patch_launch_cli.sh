#!/bin/bash

echo "🔧 Patching launch_cli.py with relative imports..."

cat <<EOF > ~/CRAV/scripts/launch_cli.py
#!/usr/bin/env python3

import argparse
import datetime
import uuid
import sys
import os

# Ensure root path is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import modules
from modules.onboard.onboard_contributor import run as onboard
from modules.avatar.map_avatar import run as map_avatar
from modules.telemetry.inject_telemetry import run as inject_telemetry
from modules.scoring.score_plugins import run as score_plugins
from modules.scoring.batch_score import run as batch_score
from modules.feedback.validate_feedback import run as validate_feedback
from modules.audit.log_action import run as log_action
from dashboard.dashboard_launcher import run as launch_dashboard

def log(msg):
    print(f"[CRAIViz] {msg}")

def main():
    parser = argparse.ArgumentParser(description="CRAIViz Unified CLI Launcher")
    parser.add_argument("--onboard_contributor", type=bool, default=False)
    parser.add_argument("--map_avatar", type=bool, default=False)
    parser.add_argument("--inject_emotional_telemetry", type=bool, default=False)
    parser.add_argument("--score_plugins", type=bool, default=False)
    parser.add_argument("--batch_score", type=bool, default=False)
    parser.add_argument("--launch_dashboard", type=bool, default=False)
    parser.add_argument("--validate_feedback", type=bool, default=False)
    parser.add_argument("--enable_audit_logging", type=bool, default=False)
    parser.add_argument("--timestamp", type=str)
    parser.add_argument("--contributor_id", type=str)
    parser.add_argument("--session_id", type=str)

    args = parser.parse_args()

    log(f"Session ID: {args.session_id}")
    log(f"Contributor: {args.contributor_id}")
    log(f"Timestamp: {args.timestamp}")

    if args.onboard_contributor:
        onboard(args.contributor_id)
    if args.map_avatar:
        map_avatar(args.contributor_id)
    if args.inject_emotional_telemetry:
        inject_telemetry(args.contributor_id)
    if args.score_plugins:
        score_plugins(args.contributor_id)
    if args.batch_score:
        batch_score(args.contributor_id)
    if args.launch_dashboard:
        launch_dashboard()
    if args.validate_feedback:
        validate_feedback(args.contributor_id)
    if args.enable_audit_logging:
        log_action(args.contributor_id, args.session_id, args.timestamp)

    log("🎯 CRAIViz orchestration complete.")

if __name__ == "__main__":
    main()
EOF

chmod +x ~/CRAV/scripts/launch_cli.py
echo "✅ launch_cli.py patched and executable."
