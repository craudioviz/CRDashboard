export function renderSentimentHeatmap(data) {
  const canvas = document.getElementById('sentimentHeatmap');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  data.forEach((score, i) => {
    ctx.fillStyle = `rgba(255, ${255 - score * 255}, ${255 - score * 255}, 1)`;
    ctx.fillRect(i * 20, 0, 18, canvas.height);
  });
}
