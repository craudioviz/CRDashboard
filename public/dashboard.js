const BASE_URL = "https://crdashboard-1.onrender.com";

function submitDashboard() {
  const data = {
    contributor: "roy_henderson",
    persona: document.getElementById("persona").value,
    payload: document.getElementById("dashboardData").value,
    timestamp: Date.now()
  };
  fetch(`${BASE_URL}/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(out => alert("Saved: " + out.file));
}

function restoreRollback() {
  const filename = document.getElementById("rollbackFilename").value;
  fetch(`${BASE_URL}/rollback/${filename}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("rollbackOutput").textContent = JSON.stringify(data, null, 2);
    });
}

function loadSentiment() {
  fetch(`${BASE_URL}/dashboard-preview`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("sentimentOutput").textContent = JSON.stringify(data, null, 2);
    });
}

function submitFeedback() {
  const data = {
    contributor: "roy_henderson",
    feedback: document.getElementById("feedbackData").value,
    timestamp: Date.now()
  };
  fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(out => alert("Feedback logged: " + out.file));
}