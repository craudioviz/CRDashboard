const BASE_URL = "https://crdashboard-1.onrender.com";

function submitDashboard() {
  const data = {
    contributor: document.getElementById("contributorID").value,
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

function submitFeedback() {
  const data = {
    contributor: document.getElementById("contributorID").value,
    feedback: document.getElementById("feedbackData").value,
    timestamp: Date.now()
  };
  fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(out => {
    document.getElementById("telemetryStream").textContent = `Logged: ${out.file}`;
  });
}