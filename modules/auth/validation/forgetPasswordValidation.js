const { body } = require("express-validator/check");

exports.forgetPasswordValidation = [
  body("email")
    .not().isEmpty()
    .withMessage("email should not be empty.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail()
    .trim(),
];
  