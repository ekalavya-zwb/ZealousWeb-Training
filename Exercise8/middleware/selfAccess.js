const selfAccess = (req, res, next) => {
  const role = req.headers["x-role"];
  const loggedInEmpId = req.headers["x-employee-id"];
  const requestedEmpId = req.params.id;

  if (role === "EMPLOYEE" && loggedInEmpId != requestedEmpId) {
    return res.status(403).json({
      error: "Employees can only access their own data",
    });
  }

  next();
};

module.exports = selfAccess;
