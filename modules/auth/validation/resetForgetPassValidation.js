const { body } = require("express-validator/check");

exports.restForgetPassValidation = [
  body("password")
    .not()
    .isEmpty()
    .withMessage("password should not be empty.Please provide a password.")
    .trim(),
    body("otp")
    .not()
    .isEmpty()
    .withMessage("otp should not be empty.Please provide a otp.")
    .trim(),
  body("email")
    .not().isEmpty()
    .withMessage("email should not be empty.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail()
    .trim(),
];
  