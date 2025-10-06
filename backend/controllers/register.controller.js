const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
// Thing to fix -> can't take role input from user end
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const lowerCaseRole = role.toLowerCase();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: lowerCaseRole,
    });
    await newUser.save();

    // Generate a token including the user's role
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); // this token should be saved in the localstorage in the frontend

    return res.status(201).send({ userRole: newUser.role, token: token });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { registerController: register };
