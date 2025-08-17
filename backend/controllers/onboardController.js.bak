const Onboard = require('../models/Onboard');
const fs = require('fs');
const crypto = require('crypto');
exports.handleOnboard = async (req, res) => {
  try {
    const required = ["name", "email", "company", "goals"];
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    const required = ["name", "email", "company", "goals"];
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    const required = ['name','email','company','goals'];
    for (const field of required) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    const { name, email, company, role, goals, interests } = req.body;
    const newEntry = new Onboard({ name, email, company, role, goals, interests });
    await newEntry.save();
n    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      hash: crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex'),
      payload: req.body
    };
    fs.appendFileSync('logs/onboard.log', JSON.stringify(logEntry) + '
');
    const message = `Welcome aboard, ${name} from ${company}! Your goals — "${goals}" — are now part of CRAI’s mission.`;
    res.status(200).json({ message });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Internal server error during onboarding.' });
  }
};
