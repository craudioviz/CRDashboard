from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)
audit_log = []
contributors = {}
avatars = {}

def log_event(event_type, payload):
    audit_log.append({
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "type": event_type,
        "avatar": payload.get("avatar", "unknown"),
        "emotion": payload.get("emotion", None),
        "score": payload.get("score", None),
        "target": payload.get("target", None),
        "notes": payload.get("notes", None),
        "contributor": payload.get("contributor", None)
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "alive"}), 200

@app.route('/deploy', methods=['POST'])
def deploy():
    payload = request.get_json()
    log_event("deploy", payload)
    return jsonify({"status": "deployed", "target": payload.get("target")}), 200

@app.route('/avatar', methods=['POST'])
def avatar():
    payload = request.get_json()
    avatars[payload["avatar"]] = payload
    log_event("avatar", payload)
    return jsonify({"status": "avatar mapped", "avatar": payload.get("avatar")}), 200

@app.route('/sentiment', methods=['POST'])
def sentiment():
    payload = request.get_json()
    log_event("sentiment", payload)
    return jsonify({"status": "sentiment scored", "score": payload.get("score")}), 200

@app.route('/modulate', methods=['POST'])
def modulate():
    payload = request.get_json()
    log_event("modulate", payload)
    return jsonify({"status": "modulated", "target": payload.get("target")}), 200

@app.route('/rollback', methods=['POST'])
def rollback():
    payload = request.get_json()
    log_event("rollback", payload)
    return jsonify({"status": "rolled back", "target": payload.get("target")}), 200

@app.route('/feedback', methods=['POST'])
def feedback():
    payload = request.get_json()
    log_event("feedback", payload)
    return jsonify({"status": "feedback received", "emotion": payload.get("emotion")}), 200

@app.route('/contributor', methods=['POST'])
def contributor():
    payload = request.get_json()
    contributors[payload["id"]] = payload
    log_event("contributor", payload)
    return jsonify({"status": "registered", "id": payload.get("id")}), 200

@app.route('/scaffold', methods=['POST'])
def scaffold():
    payload = request.get_json()
    avatars[payload["avatar"]] = payload
    log_event("scaffold", payload)
    return jsonify({"status": "scaffolded", "avatar": payload.get("avatar")}), 200

@app.route('/score/batch', methods=['POST'])
def batch_score():
    payload = request.get_json()
    for entry in payload.get("batch", []):
        log_event("batch_score", entry)
    return jsonify({"status": "batch scored", "count": len(payload.get("batch", []))}), 200

@app.route('/audit', methods=['GET'])
def audit():
    return jsonify({"log": audit_log}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

@app.route('/sync', methods=['POST'])
def sync():
    payload = request.get_json()
    log_event("sync", payload)
    return jsonify({"status": "sync received", "timestamp": payload.get("timestamp")}), 200
