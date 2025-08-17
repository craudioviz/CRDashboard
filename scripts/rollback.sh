#!/bin/bash
echo "🧹 Rolling back uploads and onboarding test data..."

rm -rf /mnt/c/craiviz/public/uploads/*
echo "✅ Uploads cleared."

mongo --eval 'db.users.deleteMany({ email: "royhenderson@craudiovizai.com" })' craiviz
echo "✅ Test user removed from MongoDB."
