require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'logs/orchestration_log.json');
const tokenEndpoint = 'https://openapi.akool.com/api/open/v3/getToken';

async function getAkoolToken() {
  const response = await axios.post(tokenEndpoint, {
    clientId: process.env.AKOOL_CLIENT_ID,
    clientSecret: process.env.AKOOL_CLIENT_SECRET
  }, { headers: { 'Content-Type': 'application/json' }});
  const { code, token } = response.data;
  if (code !== 1000 || !token) throw new Error(`Token fetch failed. Code: ${code}`);
  return token;
}

async function createAkoolClient() {
  const token = await getAkoolToken();
  return axios.create({
    baseURL: 'https://openapi.akool.com/api/open/v3',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
}

function logOrchestration({ contributor, endpoint, method, payload, response }) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, contributor, method, endpoint, payload, response };
  const existing = fs.existsSync(logPath)
    ? JSON.parse(fs.readFileSync(logPath, 'utf-8'))
    : [];
  existing.push(entry);
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2));
}

async function orchestrate({ contributor = 'CRAIViz-AI', method = 'GET', endpoint = '/', payload = {} }) {
  const client = await createAkoolClient();
  const config = {
    method: method.toLowerCase(),
    url: endpoint,
    ...(method !== 'GET' && { data: payload })
  };
  const response = await client.request(config);
  console.log(`🔍 Akool ${method} ${endpoint} →`, response.data);
  logOrchestration({ contributor, endpoint, method, payload, response: response.data });
}

(async () => {
  const [method = 'GET', endpoint = '/', payloadRaw = '{}', contributor = 'CRAIViz-AI'] = process.argv.slice(2);
  try {
    const payload = JSON.parse(payloadRaw);
    await orchestrate({ method, endpoint, payload, contributor });
  } catch (err) {
    console.error('CRAIViz CLI Error:', err.message);
  }
})();