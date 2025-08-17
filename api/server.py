from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)
audit_log = []

@app.route("/modulate", methods=["POST"])
def modulate():
    data = request.get_json()
    entry = {
        "type": "modulate",
        "avatar": data.get("avatar"),
        "emotion": data.get("emotion"),
        "timestamp": datetime.now().isoformat()
    }
    audit_log.append(entry)
    return jsonify({**entry, "status": "modulated"}), 200

@app.route("/rollback", methods=["POST"])
def rollback():
    data = request.get_json()
    entry = {
        "type": "rollback",
        "avatar": data.get("avatar"),
        "checkpoint": data.get("checkpoint"),
        "timestamp": datetime.now().isoformat()
    }
    audit_log.append(entry)
    return jsonify({**entry, "status": "rolled back"}), 200

@app.route("/audit", methods=["GET"])
def audit():
    return jsonify({"log": audit_log}), 200

@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.get_json()
    entry = {
        "type": "feedback",
        "avatar": data.get("avatar"),
        "score": data.get("score"),
        "notes": data.get("notes"),
        "timestamp": datetime.now().isoformat()
    }
    audit_log.append(entry)
    return jsonify({**entry, "status": "feedback received"}), 200

@app.route("/deploy", methods=["POST"])
def deploy():
    data = request.get_json()
    entry = {
        "type": "deploy",
        "avatar": data.get("avatar"),
        "target": data.get("target"),
        "timestamp": datetime.now().isoformat()
    }
    audit_log.append(entry)
    return jsonify({**entry, "status": "deployed"}), 200

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "alive"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
