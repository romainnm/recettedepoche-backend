const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign(
    { userId: user._id, admin: user.admin },
    process.env.JWT_PWD,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  res
    .status(201)
    .json({ userInfo: { name: user.name, admin: user.admin }, token });
};

module.exports = { register };
