const express = require("express");

const { auth, ctrlWrapper, validation, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUpdateSubscription, joiVerify } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiUpdateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verify));

router.post("/verify", validation(joiVerify), ctrlWrapper(ctrl.refreshVerify));

module.exports = router;
