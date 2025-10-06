const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .send({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "Forbidden: Admin access required" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send(err);
  }
};

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .send({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.role !== "user") {
      return res
        .status(403)
        .send({ message: "Forbidden: Admin access required" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { adminAuthMiddleware: adminAuthMiddleware, userAuthMiddleware: userAuthMiddleware };
