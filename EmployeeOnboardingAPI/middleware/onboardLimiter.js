const rateLimit = require("express-rate-limit");

const onboardLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers

  handler: (req, res) => {
    res.status(429).json({
      error: "Too many onboarding attempts. Try later.",
    });
  },
});

module.exports = onboardLimiter;
