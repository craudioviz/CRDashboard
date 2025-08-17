const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.create({ email, name });
    res.status(201).json({ message: 'Onboarding complete', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
