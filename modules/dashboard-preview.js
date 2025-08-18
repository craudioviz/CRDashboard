const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>CRAIViz Dashboard</title></head>
      <body>
        <h1>CRAIViz Dashboard</h1>
        <p>Contributor: Roy</p>
        <ul>
          <li>Positive: 2</li>
          <li>Negative: 1</li>
          <li>Neutral: 2</li>
        </ul>
        <p>Preview: positive, negative, neutral, positive, neutral</p>
      </body>
    </html>
  `;
  res.send(html);
});

module.exports = router;