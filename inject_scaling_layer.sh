#!/bin/bash
cd /mnt/c/craiviz

# Contributor Registry
cat > register_contributor.sh << 'EOL'
#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/contributor \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"CRAI-001\",\"role\":\"orchestrator\",\"emotion\":\"focused\"}"
EOL

# Avatar Scaffolding
cat > scaffold_avatar.sh << 'EOL'
#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/scaffold \
  -H "Content-Type: application/json" \
  -d "{\"avatar\":\"$CRAIVIZ_AVATAR\",\"traits\":[\"adaptive\",\"resonant\"],\"hooks\":[\"modulate\",\"score\"]}"
EOL

# Batch Scoring
cat > batch_score.sh << 'EOL'
#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/score/batch \
  -H "Content-Type: application/json" \
  -d '{"batch":[{"avatar":"ModuloMuse","score":9.1},{"avatar":"ModuloMuse","score":8.7}]}'
EOL

# Cloud Sync Stub
cat > sync_payload.sh << 'EOL'
#!/bin/bash
source craiviz-env.sh
curl -X POST http://$CRAIVIZ_HOST_IP:5000/sync \
  -H "Content-Type: application/json" \
  -d "{\"avatar\":\"$CRAIVIZ_AVATAR\",\"timestamp\":\"$CRAIVIZ_TIMESTAMP\",\"notes\":\"sync placeholder\"}"
EOL

# Flask Endpoint Patch
cat >> app.py << 'EOL'

@app.route('/sync', methods=['POST'])
def sync():
    payload = request.get_json()
    log_event("sync", payload)
    return jsonify({"status": "sync received", "timestamp": payload.get("timestamp")}), 200
EOL

# CLI Menu Patch
sed -i '/"Exit") break ;;/i \
    "Contributor") ./register_contributor.sh; break ;;\
    "Scaffold") ./scaffold_avatar.sh; break ;;\
    "BatchScore") ./batch_score.sh; break ;;\
    "Sync") ./sync_payload.sh; break ;;' craiviz-cli.sh

# Makefile Patch
cat >> Makefile << 'EOL'

contributor:
	@bash register_contributor.sh

scaffold:
	@bash scaffold_avatar.sh

batchscore:
	@bash batch_score.sh

sync:
	@bash sync_payload.sh
EOL

chmod +x register_contributor.sh scaffold_avatar.sh batch_score.sh sync_payload.sh
echo "[✓] Scaling layer injected—CRAIViz is ready to go global."
