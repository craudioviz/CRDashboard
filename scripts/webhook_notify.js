const https = require('https');

const payload = JSON.stringify({
  event: 'avatar_deployed',
  contributor: process.argv[2],
  timestamp: new Date().toISOString()
});

const options = {
  hostname: 'webhook.site',
  path: '/your-custom-path',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

const req = https.request(options, res => {
  console.log(`🔔 Webhook status: ${res.statusCode}`);
});

req.on('error', error => {
  console.error('❌ Webhook error:', error);
});

req.write(payload);
req.end();
