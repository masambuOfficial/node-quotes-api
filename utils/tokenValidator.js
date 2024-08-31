const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Auth header is missing" });
  }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Invalid token" });
        }
        req.user = user; // Attach user to request
        next();
    });
};

module.exports = validateToken;
