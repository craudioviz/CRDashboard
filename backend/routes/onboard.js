const express = require('express');
const router = express.Router();
const { handleOnboard } = require('../controllers/onboardController');
router.post('/onboard', handleOnboard);
module.exports = router;
