const jwt = require("jsonwebtoken");
const SECRET_KEY = "as1WK-dmW45-adbe5-eh98F-KLa78";

// Middleware to check for authentication token before providing access to protected routes

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
