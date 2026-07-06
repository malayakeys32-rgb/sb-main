module.exports = function (req, res, next) {
  // Example placeholder auth
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // TODO: verify token
  next();
};
