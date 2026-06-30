// Helper function to format leaderboard data
function getFormattedLeaderboard(leaderboard) {
  // The leaderboard data is returned as an array of [playerId, score, playerId, score, ...]
  console.log("Raw leaderboard data:", leaderboard);
  const formatted = [];
  for (let i = 0; i < leaderboard.length; i += 2) {
    formatted.push({
      playerId: leaderboard[i],
      score: Number(leaderboard[i + 1]),
    });
  }
  return formatted;
}

module.exports = {
  getFormattedLeaderboard,
};
