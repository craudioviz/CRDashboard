require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../logs/token_audit.json');
const tokenEndpoint = 'https://openapi.akool.com/api/open/v3/getToken';

async function getFreshToken() {
  const response = await axios.post(tokenEndpoint, {
    clientId: process.env.AKOOL_CLIENT_ID,
    clientSecret: process.env.AKOOL_CLIENT_SECRET
  }, {
    headers: { 'Content-Type': 'application/json' }
  });

  const { code, token } = response.data;
  if (code !== 1000 || !token) throw new Error(`Token fetch failed. Code: ${code}`);

  const timestamp = new Date().toISOString();
  const logEntry = { token, timestamp, contributor: 'CRAIViz-AI' };
  fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2));
  return token;
}

function isTokenExpired(log) {
  const expiryBufferHours = 8760;
  const issued = new Date(log.timestamp);
  const now = new Date();
  const ageHours = (now - issued) / 36e5;
  return ageHours > expiryBufferHours;
}

async function getValidToken() {
  if (fs.existsSync(logPath)) {
    const log = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
    if (!isTokenExpired(log)) return log.token;
  }
  return await getFreshToken();
}

module.exports = getValidToken;
