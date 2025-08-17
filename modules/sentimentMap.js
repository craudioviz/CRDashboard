module.exports = function scorePlugin(pluginName, feedback) {
  const score = feedback.includes("💡") ? 1.0 :
                feedback.includes("😐") ? 0.5 :
                feedback.includes("⚠️") ? 0.2 : 0.0;
  return { pluginName, score };
};
