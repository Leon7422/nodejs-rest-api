const express = require("express");

const { auth, ctrlWrapper, validation, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUpdateSubscription } = require("../../models/user");

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

module.exports = router;
