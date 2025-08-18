const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/:filename', (req, res) => {
  const file = req.params.filename;
  const filepath = path.join(__dirname, '../logs', file);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'Audit file not found' });
  }

  const data = fs.readFileSync(filepath, 'utf-8');
  const parsed = JSON.parse(data);

  console.log(`🔁 Rollback loaded: ${file}`);
  res.json({ status: 'rollback_ready', data: parsed });
});

module.exports = router;