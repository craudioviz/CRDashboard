const axios = require('axios');
const fs = require('fs');
const path = require('path');

const email = "royhenderson@craudiovizai.com";
const PORT = 4000;
const logPath = path.join(__dirname, 'logs.json');

(async () => {
  const log = { timestamp: new Date().toISOString() };

  try {
    console.log("🔍 Fetching persona...");
    const persona = await axios.get(`http://localhost:${PORT}/persona/${email}`);
    console.log("✅ Persona:", persona.data);
    log.persona = persona.data;

    console.log("🎭 Updating mood...");
    const moodUpdate = await axios.post(`http://localhost:${PORT}/persona/${email}/mood`, {
      mood: "focused",
      trigger: "CLI test"
    });
    console.log("✅ Mood updated:", moodUpdate.data);
    log.moodUpdate = moodUpdate.data;

    console.log("📊 Logging UX event...");
    const eventLog = await axios.post(`http://localhost:${PORT}/analytics/log`, {
      email,
      event: "test_run",
      context: "CLI simulation"
    });
    console.log("✅ Event logged:", eventLog.data);
    log.eventLog = eventLog.data;

    console.log("📈 Fetching dashboard...");
    const dashboard = await axios.get(`http://localhost:${PORT}/dashboard/${email}`);
    console.log("✅ Dashboard:", dashboard.data);
    log.dashboard = dashboard.data;

    // Save to logs.json
    const logs = fs.existsSync(logPath)
      ? JSON.parse(fs.readFileSync(logPath))
      : [];
    logs.push(log);
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
    console.log("📝 Log saved to logs.json");
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
})();
