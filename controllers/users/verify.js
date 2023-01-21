const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw new NotFound("Not Found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Your email has been verified",
  });
};

module.exports = verify;
