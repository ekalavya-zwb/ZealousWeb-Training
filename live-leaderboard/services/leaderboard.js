const {
  redisDB,
  redisSubscriber,
  redisPublisher,
  LEADERBOARD_KEY,
  TOTAL_SCORES_KEY,
  LEADERBOARD_CHANNEL,
} = require("../config/redis");

// Helper function to update player score
async function updatePlayerScore(playerId, score) {
  // Use a Redis pipeline to update the player's score and increment total scores in a single round trip
  const [leaderboardResult, totalScoresResult] = await redisDB
    .pipeline()
    .zincrby(LEADERBOARD_KEY, score, playerId) // Increment player's score in the leaderboard
    .incr(TOTAL_SCORES_KEY) // Increment total scores counter
    .exec();

  console.log("Leaderboard update result:", leaderboardResult);
  console.log("Total scores update result:", totalScoresResult);

  const updatedCount = totalScoresResult[1];

  console.log(`Updated score for player ${playerId} by ${score} points`);
  console.log(`Scores updated ${updatedCount} times`);
}

// Helper function to get the leaderboard
async function getLeaderboard(topN = 10) {
  // Use ZREVRANGE to get the top N players with their scores in a single round trip
  // The "WITHSCORES" option returns an array of [playerId, score, playerId, score, ...]
  const leaderboard = await redisDB.zrevrange(
    LEADERBOARD_KEY,
    0,
    topN - 1,
    "WITHSCORES",
  );
  return leaderboard;
}

// Helper function to get player stats
async function getPlayerStats(playerId) {
  // Use a Redis pipeline to fetch both rank and score in a single round trip
  const [rankResult, scoreResult] = await redisDB
    .pipeline()
    .zrevrank(LEADERBOARD_KEY, playerId) // Get player's rank (0-based)
    .zscore(LEADERBOARD_KEY, playerId) // Get player's score
    .exec();

  console.log("Rank result:", rankResult);
  console.log("Score result:", scoreResult);

  const rank = rankResult[1] !== null ? rankResult[1] + 1 : null; // Convert to 1-based rank
  const score = scoreResult[1] !== null ? Number(scoreResult[1]) : null; // Convert score to integer
  return { rank, score };
}

module.exports = {
  updatePlayerScore,
  getLeaderboard,
  getPlayerStats,
};
