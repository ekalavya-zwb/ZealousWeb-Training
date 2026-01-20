const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers["x-role"];

    if (!role) {
      return res.status(401).json({ error: "Role not provided" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        error: "Access denied",
        allowed: allowedRoles,
        yourRole: role,
      });
    }

    next();
  };
};

module.exports = allowRoles;
