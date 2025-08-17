const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('onboarding', {
    title: 'Welcome to CRAIViz',
    tagline: 'Emotionally intelligent systems for creative growth',
    avatar: {
      name: 'Roy',
      emotion: 'Focused',
      style: 'Modular'
    }
  });
});

module.exports = router;
