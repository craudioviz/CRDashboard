// cli/javari-decision.js
const axios = require('axios');

console.log("🚀 Triggering Javari decision...");

const decision = {
  contributor: "roy_henderson",
  timestamp: new Date().toISOString(),
  bot: "ScoreBot",
  action: "Accepted"
};

// 🔁 Step 1: Trigger Javari Endpoint
axios.get('https://crdashboard-1.onrender.com/javari')
  .then(res => {
    console.log("✅ Javari Response:");
    console.log(JSON.stringify(res.data, null, 2));

    // 📝 Step 2: Log to Audit Trail
    return axios.post('https://crdashboard-1.onrender.com/audit', {
      event: "javari_decision",
      payload: decision
    });
  })
  .then(auditRes => {
    console.log("🧾 Audit Logged:");
    console.log(JSON.stringify(auditRes.data, null, 2));
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
    if (err.response) {
      console.error("🔍 Response Data:", err.response.data);
      console.error("📡 Status:", err.response.status);
    } else {
      console.error("⚠️ No response received. Check network or endpoint.");
    }
  });