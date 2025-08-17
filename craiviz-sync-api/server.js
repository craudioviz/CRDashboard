const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3100;

// Ensure logs folder exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Enable JSON body parsing
app.use(express.json());

// === Sync Endpoint ===
app.post('/sync', (req, res) => {
    const payload = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | ${JSON.stringify(payload)}\n`;

    try {
        fs.appendFileSync(path.join(logsDir, 'upload.log'), logEntry);
        res.json({ status: 'success', received: payload });
    } catch (err) {
        console.error('Log write failed:', err);
        res.status(500).json({ status: 'error', message: 'Log write failed' });
    }
});

// === Health Check Endpoint ===
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// === Start Server ===
app.listen(PORT, () => {
    console.log(`CRAIViz Sync API running on port ${PORT}`);
});
