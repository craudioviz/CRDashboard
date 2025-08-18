module.exports = (req, res) => {
  const decision = {
    contributor: "roy_henderson",
    timestamp: new Date().toISOString(),
    bot: "ScoreBot",
    action: "Accepted"
  };

  console.log("🔍 Javari Decision:", decision);
  res.json(decision);
};