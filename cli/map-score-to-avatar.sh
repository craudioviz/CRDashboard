#!/bin/bash

# === CRAIViz Score-to-Avatar Mapping ===
read -p "Plugin name: " pluginName
read -p "Contributor ID: " contribID
read -p "Feedback (💡, 😐, ⚠️): " rawFeedback

feedback="$(echo "$rawFeedback" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

if [[ "$feedback" == 💡* ]]; then
  score=1.0
elif [[ "$feedback" == 😐* ]]; then
  score=0.5
elif [[ "$feedback" == ⚠️* ]]; then
  score=0.2
else
  score=0.0
fi

# Lookup avatar and emotion
avatarLine=$(grep "$contribID" logs/contributors.log | tail -n 1)
avatarName=$(echo "$avatarLine" | awk -F'|' '{print $3}' | sed 's/Avatar: //')
emotion=$(echo "$avatarLine" | awk -F'|' '{print $4}' | sed 's/Emotion: //')

timestamp=$(date +"%Y-%m-%d %H:%M:%S")
echo "$timestamp | Plugin: $pluginName | Contributor: $contribID | Avatar: $avatarName | Emotion: $emotion | Score: $score | Feedback: $feedback" >> logs/audit.log

echo "🧠 Mapped score to avatar '$avatarName' with emotion '$emotion'"
