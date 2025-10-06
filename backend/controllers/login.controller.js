const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // return res.status(201).send("You are logged in")
        const token = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        ); // this token should be saved in the localstorage in the frontend
        return res.status(200).send({ userRole: user.role, token: token });
      } else {
        return res.status(201).send("Wrong password");
      }
    } else {
      return res.status(401).send("user not found");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { loginController: login };
