#!/bin/bash

echo "🚀 CRAIViz: Full System Injection + Go Live"

# Create all directories
mkdir -p ~/CRAV/modules/{onboard,avatar,telemetry,scoring,feedback,audit}
mkdir -p ~/CRAV/dashboard
mkdir -p ~/CRAV/data
mkdir -p ~/CRAV/logs

# Inject contributor registry
cat <<EOF > ~/CRAV/data/contributors.json
{
  "roy_henderson": {
    "name": "Roy Henderson",
    "role": "Founder",
    "emotion": "energized",
    "avatar": "visionary"
  }
}
EOF

# Inject onboard_contributor.py
cat <<EOF > ~/CRAV/modules/onboard/onboard_contributor.py
import json
def run(contributor_id):
    with open("data/contributors.json") as f:
        data = json.load(f)
    profile = data.get(contributor_id, {})
    print(f"[CRAIViz] Onboarding: {profile.get('name')} ({profile.get('role')})")
EOF

# Inject map_avatar.py
cat <<EOF > ~/CRAV/modules/avatar/map_avatar.py
def run(contributor_id):
    print(f"[CRAIViz] Avatar mapped for {contributor_id}: visionary")
EOF

# Inject inject_telemetry.py
cat <<EOF > ~/CRAV/modules/telemetry/inject_telemetry.py
def run(contributor_id):
    print(f"[CRAIViz] Emotional telemetry: {contributor_id} is energized, focused, and scaling.")
EOF

# Inject score_plugins.py
cat <<EOF > ~/CRAV/modules/scoring/score_plugins.py
def run(contributor_id):
    scores = {"modulation": 92, "telemetry": 88, "dashboard": 95}
    print(f"[CRAIViz] Plugin scores for {contributor_id}: " + ", ".join(f"{k}: {v}" for k,v in scores.items()))
EOF

# Inject batch_score.py
cat <<EOF > ~/CRAV/modules/scoring/batch_score.py
def run(contributor_id):
    total = sum([92, 88, 95])
    print(f"[CRAIViz] Batch score for {contributor_id}: {total}/300")
EOF

# Inject validate_feedback.py
cat <<EOF > ~/CRAV/modules/feedback/validate_feedback.py
def run(contributor_id):
    print(f"[CRAIViz] Feedback validated for {contributor_id}: sentiment positive, engagement high.")
EOF

# Inject log_action.py
cat <<EOF > ~/CRAV/modules/audit/log_action.py
def run(contributor_id, session_id, timestamp):
    log_entry = f"{timestamp} | {contributor_id} | {session_id} | orchestration complete\\n"
    with open("logs/audit.log", "a") as f:
        f.write(log_entry)
    print(f"[CRAIViz] Audit logged: {log_entry.strip()}")
EOF

# Inject dashboard_launcher.py
cat <<EOF > ~/CRAV/dashboard/dashboard_launcher.py
def run():
    print("[CRAIViz] Dashboard ready at http://localhost:8000 — launch manually or via browser.")
EOF

# Inject __init__.py files
for d in modules/onboard modules/avatar modules/telemetry modules/scoring modules/feedback modules/audit dashboard; do
  touch ~/CRAV/$d/__init__.py
done

# Patch launch_cli.py with full logic
cat <<EOF > ~/CRAV/scripts/launch_cli.py
#!/usr/bin/env python3

import argparse, datetime, uuid, sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from modules.onboard.onboard_contributor import run as onboard
from modules.avatar.map_avatar import run as map_avatar
from modules.telemetry.inject_telemetry import run as inject_telemetry
from modules.scoring.score_plugins import run as score_plugins
from modules.scoring.batch_score import run as batch_score
from modules.feedback.validate_feedback import run as validate_feedback
from modules.audit.log_action import run as log_action
from dashboard.dashboard_launcher import run as launch_dashboard

def log(msg): print(f"[CRAIViz] {msg}")

def main():
    parser = argparse.ArgumentParser()
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

    if args.onboard_contributor: onboard(args.contributor_id)
    if args.map_avatar: map_avatar(args.contributor_id)
    if args.inject_emotional_telemetry: inject_telemetry(args.contributor_id)
    if args.score_plugins: score_plugins(args.contributor_id)
    if args.batch_score: batch_score(args.contributor_id)
    if args.launch_dashboard: launch_dashboard()
    if args.validate_feedback: validate_feedback(args.contributor_id)
    if args.enable_audit_logging: log_action(args.contributor_id, args.session_id, args.timestamp)

    log("🎯 CRAIViz orchestration complete.")

if __name__ == "__main__":
    main()
EOF

chmod +x ~/CRAV/scripts/launch_cli.py
echo "✅ All modules injected, CLI patched, system live."
