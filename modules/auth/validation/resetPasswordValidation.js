const { body } = require("express-validator/check");

exports.resetPasswordValidation = [
  body("currentPassword")
    .not()
    .isEmpty()
    .withMessage(
      "current password should not be empty.Please provide current password."
    )
    .trim(),
  body("newPassword")
    .not()
    .isEmpty()
    .withMessage(
      "new password should not be empty.Please provide new password."
    )
    .trim(),
];
