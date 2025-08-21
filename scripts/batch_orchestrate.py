#!/usr/bin/env python3

import json, uuid, datetime, os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from modules.onboard.onboard_contributor import run as onboard
from modules.avatar.map_avatar import run as map_avatar
from modules.telemetry.inject_telemetry import run as inject_telemetry
from modules.scoring.score_plugins import run as score_plugins
from modules.scoring.batch_score import run as batch_score
from modules.feedback.validate_feedback import run as validate_feedback
from modules.audit.log_action import run as log_action
from dashboard.dashboard_launcher import run as launch_dashboard
from dashboard.dashboard_render import render as render_dashboard
from analytics.contributor_insights import run as show_insights
from cloud.cloud_sync import run as sync_to_cloud
from cloud.secure_sync import run as secure_sync
from modules.adaptive.adaptive_score import run as adaptive_score
from modules.adaptive.scoring_evolve import run as scoring_evolve
from telemetry.feedback_ingest import run as ingest_feedback
from api.endpoint_stub import upload as api_upload

def orchestrate(contributor_id):
    session_id = f"auto_{uuid.uuid4()}"
    timestamp = datetime.datetime.utcnow().isoformat() + "Z"
    print(f"\n🔁 Orchestrating {contributor_id} | {session_id}")

    onboard(contributor_id)
    map_avatar(contributor_id)
    inject_telemetry(contributor_id)
    score_plugins(contributor_id)
    batch_score(contributor_id)
    launch_dashboard()
    validate_feedback(contributor_id)
    log_action(contributor_id, session_id, timestamp)

    feedback = "I love how intuitive this feels!"
    sentiment = ingest_feedback(contributor_id, feedback)
    evolved_score = scoring_evolve(contributor_id, sentiment)

    sync_to_cloud(contributor_id, session_id, evolved_score)
    secure_sync(contributor_id, session_id, evolved_score)
    api_upload({"contributor": contributor_id, "session": session_id, "score": evolved_score})

    show_insights(contributor_id)
    render_dashboard(contributor_id)

def main():
    with open("data/contributors.json") as f:
        contributors = json.load(f)
    for contributor_id in contributors.keys():
        orchestrate(contributor_id)

if __name__ == "__main__":
    main()
