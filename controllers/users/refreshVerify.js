const { User } = require("../../models/user");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const refreshVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
    return;
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = refreshVerify;
