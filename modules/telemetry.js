export function loadTelemetry(contributorId) {
  return fetch('../logs/audit.log')
    .then(res => res.text())
    .then(text => {
      const lines = text.split('\n').filter(l => l.includes(contributorId));
      return lines.map(l => {
        const score = parseFloat(l.split('Score: ')[1]);
        return score;
      });
    });
}
