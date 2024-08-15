const jwt = require("jsonwebtoken");
const SECRET_KEY = "as1WK-dmW45-adbe5-eh98F-KLa78";

// Middleware to check for authentication token before providing access to protected routes

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, userid) => {
    if (err) return res.sendStatus(403);
    req.userid = userid;
    next();
  });
};

module.exports = authenticateToken;
