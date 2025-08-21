import sys
import os
import datetime

# ✅ Inject project root into Python path
sys.path.insert(0, os.path.expanduser("~/CRAV"))

# ✅ Module Imports
from api.web_onboarding import register
from telemetry.live_stream import stream
from api.real_api import post_score
from modules.adaptive.learning_engine import train

# ✅ Dashboard HTML Path
DASHBOARD_PATH = os.path.expanduser("~/CRAV/dashboard/frontend_dashboard.html")

# ✅ Cloud Sync Placeholder
def cloud_sync(username, score, emotion):
    print("\n☁️ Cloud Sync: [Placeholder]")
    print(f"🔄 Uploading score {score} and emotion '{emotion}' for {username} to secure endpoint...\n")
    return {
        "username": username,
        "score": score,
        "emotion": emotion,
        "status": "cloud_sync_stubbed"
    }

# ✅ Dashboard Renderer
def render_dashboard(username, full_name, score, emotion):
    html = f"""<!DOCTYPE html>
<html>
<head><title>CRAIViz Dashboard</title></head>
<body>
  <h1>CRAIViz Contributor Dashboard</h1>
  <div id="contributors">
    <p>{full_name} — Score: {score} — Emotion: {emotion}</p>
  </div>
</body>
</html>"""
    os.makedirs(os.path.dirname(DASHBOARD_PATH), exist_ok=True)
    with open(DASHBOARD_PATH, "w") as f:
        f.write(html)
    print(f"🖥️ Dashboard HTML written to: {DASHBOARD_PATH}")

# ✅ Full Deployment Function
def deploy_all(username, full_name, role, emotion, archetype, plugin_id, score, token, feedback):
    timestamp = datetime.datetime.now().isoformat()
    print(f"\n🚀 CRAIViz Ultimate Deployment — {timestamp}")

    register(username, full_name, role, emotion, archetype)
    stream(username)
    post_score(username, plugin_id, score, token)
    train(username, feedback)
    render_dashboard(username, full_name, score, emotion)
    cloud_sync(username, score, emotion)

    audit = {
        "timestamp": timestamp,
        "username": username,
        "status": "full_deployment_complete"
    }

    print("📜 Audit Log:")
    print(audit)
    return audit

# ✅ CLI Argument Parsing
if __name__ == "__main__":
    if len(sys.argv) != 10:
        print("\n❌ Usage:")
        print("python3 craiviz_go_live_all.py <username> <full_name> <role> <emotion> <archetype> <plugin_id> <score> <token> <feedback>\n")
        sys.exit(1)

    username      = sys.argv[1]
    full_name     = sys.argv[2]
    role          = sys.argv[3]
    emotion       = sys.argv[4]
    archetype     = sys.argv[5]
    plugin_id     = sys.argv[6]
    score         = int(sys.argv[7])
    token         = sys.argv[8]
    feedback      = sys.argv[9]

    deploy_all(username, full_name, role, emotion, archetype, plugin_id, score, token, feedback)
