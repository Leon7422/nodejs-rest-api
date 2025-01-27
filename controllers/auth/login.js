const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
/* const bcrypt = require("bcryptjs"); */
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new Unauthorized("Please verify your email");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "succes",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
