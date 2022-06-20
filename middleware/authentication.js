const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
  } catch (e) {
    throw new UnauthenticatedError("Invalid token");
  }
  next();
};

module.exports = auth;
