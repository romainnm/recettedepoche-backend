const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  // Check if all information are filled
  if (!email || !password) {
    res.status(401).json({ msg: "Credentials missing" });
  }
  // Check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ msg: "User does not exists" });
  }
  // Compare user password the the database
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ msg: "password incorrect, try again" });
  }
  const token = jwt.sign({ admin: user.admin }, process.env.JWT_PWD, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res
    .status(200)
    .json({ userInfo: { name: user.name, admin: user.admin }, token });
};

module.exports = { login };
