module.exports = function logTelemetry(contributorId, avatarId, mood, context) {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    contributorId,
    avatarId,
    mood,
    context
  };
  console.log("[Telemetry]", JSON.stringify(entry));
};
