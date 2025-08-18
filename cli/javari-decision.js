// cli/javari-decision.js
const axios = require('axios');

console.log("🚀 Starting Javari decision script...");

const decision = {
  contributor: "roy_henderson",
  timestamp: new Date().toISOString(),
  bot: "ScoreBot",
  action: "Accepted"
};

(async () => {
  try {
    console.log("🔁 Sending GET to /javari...");
    const javariRes = await axios.get('http://localhost:3000/javari');
    console.log("✅ Javari Response:");
    console.log(JSON.stringify(javariRes.data, null, 2));
  } catch (err) {
    console.error("❌ Javari GET failed:", err.message);
    if (err.response) {
      console.error("🔍 Response Data:", err.response.data);
      console.error("📡 Status:", err.response.status);
    }
  }

  try {
    console.log("📝 Sending POST to /audit...");
    const auditRes = await axios.post('http://localhost:3000/audit', {
      event: "javari_decision",
      payload: decision
    });
    console.log("🧾 Audit Logged:");
    console.log(JSON.stringify(auditRes.data, null, 2));
  } catch (err) {
    console.error("❌ Audit POST failed:", err.message);
    if (err.response) {
      console.error("🔍 Response Data:", err.response.data);
      console.error("📡 Status:", err.response.status);
    }
  }
})();