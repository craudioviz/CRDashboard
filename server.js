const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public")); // Optional: serve frontend from /public

// ✅ Root route confirmation
app.get("/", (req, res) => {
  res.send("CRAIViz backend is live and audit-logged.");
});

// ✅ Dashboard submission
app.post("/dashboard", (req, res) => {
  const data = req.body;
  const filename = `logs/dashboard-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  res.status(200).send({ status: "Dashboard saved", file: filename });
});

// ✅ Rollback restore
app.get("/rollback/:filename", (req, res) => {
  const filePath = path.join("logs", req.params.filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.status(200).send(JSON.parse(data));
  } else {
    res.status(404).send({ error: "File not found" });
  }
});

// ✅ Sentiment preview
app.get("/dashboard-preview", (req, res) => {
  const files = fs.readdirSync("logs").filter(f => f.startsWith("dashboard"));
  const latest = files.sort().reverse()[0];
  if (latest) {
    const data = fs.readFileSync(path.join("logs", latest));
    res.status(200).send(JSON.parse(data));
  } else {
    res.status(404).send({ error: "No dashboard found" });
  }
});

// ✅ Emotional telemetry
app.post("/telemetry", (req, res) => {
  const data = req.body;
  const filename = `logs/telemetry-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  res.status(200).send({ status: "Telemetry saved", file: filename });
});

// ✅ Feedback logging
app.post("/feedback", (req, res) => {
  const data = req.body;
  const filename = `logs/feedback-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  res.status(200).send({ status: "Feedback saved", file: filename });
});

// ✅ Ensure logs folder exists
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

app.listen(PORT, () => {
  console.log(`CRAIViz backend running on port ${PORT}`);
});