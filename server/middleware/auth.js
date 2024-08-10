const jwt = require("jsonwebtoken");

const auth = (roles) => (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access denied.");
    }
    next();
  } catch (err) {
    res.status(401).send("Invalid token.");
  }
};

module.exports = auth;
