const rateLimit = require("express-rate-limit");

const onboardLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      error: "Too many onboarding attempts. Try later.",
    });
  },
});

module.exports = onboardLimiter;
