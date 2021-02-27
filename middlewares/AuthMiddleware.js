const jwt = require("jsonwebtoken");

require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Checking for token existence and validation:
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({ message: "Authentication failed" });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send({ message: "User not authenticated" });
  }
};

module.exports = { requireAuth };
