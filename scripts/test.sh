#!/bin/bash
echo "🧪 Testing /branding route..."
curl -s http://localhost:4000/branding | jq . || echo "❌ Invalid JSON"

echo "🧪 Testing /api/onboard..."
curl -s -X POST http://localhost:4000/api/onboard \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Roy Henderson",
    "email": "royhenderson@craudiovizai.com",
    "company": "CRAIViz AI",
    "goals": "Scale emotionally intelligent SaaS ecosystems",
    "avatar": "visionary",
    "mood": "energized"
  }' | jq . || echo "❌ Invalid JSON"

echo "🧪 Testing /auth/signup..."
curl -s -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Roy Henderson",
    "email": "royhenderson@craudiovizai.com",
    "password": "warpSpeed123"
  }' | jq . || echo "⚠️ Signup may already exist"

echo "🧪 Testing /auth/login..."
curl -s -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "royhenderson@craudiovizai.com",
    "password": "warpSpeed123"
  }' | jq . || echo "❌ Login failed or malformed response"
