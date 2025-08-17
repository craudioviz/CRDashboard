export function loadAuditLog() {
  return fetch('../logs/audit.log')
    .then(res => res.text())
    .then(text => document.getElementById('auditContent').textContent = text);
}
