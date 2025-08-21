# Set base path
$basePath = "C:\craiviz\cr-audioviz-ai"

# Define file paths
$validatorPath = "$basePath\backend\orchestration\cli\validator.ts"
$envTemplatePath = "$basePath\config\env\.env.template"
$fallbackPath = "$basePath\backend\orchestration\sync\fallback.ts"

# Create and write validator.ts
@"
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../config/env/.env.template') });

const requiredKeys = [
  'AKOOL_API_KEY',
  'FIREBASE_API_KEY',
  'SUPABASE_URL',
  'SUPABASE_KEY',
  'VERCEL_TOKEN',
  'TIKTOK_API_KEY',
  'YOUTUBE_API_KEY',
  'X_API_KEY',
  'FACEBOOK_API_KEY',
  'EMOTION_ENGINE_URL',
  'EMOTION_ENGINE_KEY',
  'SCORING_API_URL',
  'SCORING_API_KEY',
  'DASHBOARD_SYNC_URL',
  'DASHBOARD_SYNC_KEY',
  'CLI_SECRET_KEY',
  'CLI_LOGGING_ENDPOINT',
  'AVATAR_WORLD_URL',
  'AVATAR_WORLD_TOKEN'
];

const missing = requiredKeys.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.warn('⚠️ Missing environment variables:');
  missing.forEach(key => console.warn(`- ${key}`));
  process.exit(1);
} else {
  console.log('✅ All required environment variables are present.');
}
"@ | Set-Content -Path $validatorPath

# Create and write .env.template
@"
# Akool API
AKOOL_API_KEY=

# Firebase
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

# Supabase
SUPABASE_URL=
SUPABASE_KEY=

# Vercel
VERCEL_TOKEN=

# Social APIs
TIKTOK_API_KEY=
YOUTUBE_API_KEY=
X_API_KEY=
FACEBOOK_API_KEY=

# Emotional Telemetry
EMOTION_ENGINE_URL=
EMOTION_ENGINE_KEY=

# Contributor Scoring
SCORING_API_URL=
SCORING_API_KEY=

# Dashboard Sync
DASHBOARD_SYNC_URL=
DASHBOARD_SYNC_KEY=

# CLI Orchestration
CLI_SECRET_KEY=
CLI_LOGGING_ENDPOINT=

# Avatar World
AVATAR_WORLD_URL=
AVATAR_WORLD_TOKEN=
"@ | Set-Content -Path $envTemplatePath

# Create and write fallback.ts
@"
export function handleMissingEnv(key: string, avatar: string) {
  console.warn(`⚠️ ${key} is missing. Triggering fallback protocol for ${avatar}.`);

  switch (avatar.toLowerCase()) {
    case 'crai':
      return 'CRAI fallback: default orchestration mode activated.';
    case 'javari':
      return 'Javari fallback: emotional telemetry paused.';
    case 'kairo':
      return 'Kairo fallback: contributor scoring disabled.';
    case 'vizara':
      return 'Vizara fallback: campaign sync offline.';
    case 'nova':
      return 'Nova fallback: content engine in safe mode.';
    default:
      return 'Generic fallback: system running in degraded mode.';
  }
}
"@ | Set-Content -Path $fallbackPath

Write-Host "✅ Files injected successfully into CR AudioViz AI structure."