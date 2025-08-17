const express = require('express');
const router = express.Router();

const avatars = {
  visionary: {
    mood: "energized",
    traits: ["strategic", "empathetic", "modular"],
    quote: "Build systems that feel like magic."
  },
  analyst: {
    mood: "focused",
    traits: ["precise", "logical", "auditable"],
    quote: "Every action should leave a trail."
  },
  creator: {
    mood: "inspired",
    traits: ["expressive", "intuitive", "emotional"],
    quote: "Design with soul, not just specs."
  }
};

router.get('/:id', (req, res) => {
  const avatar = avatars[req.params.id];
  if (!avatar) return res.status(404).json({ error: "Avatar not found" });
  res.status(200).json(avatar);
});

module.exports = router;
