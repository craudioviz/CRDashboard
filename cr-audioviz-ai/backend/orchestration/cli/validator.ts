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
