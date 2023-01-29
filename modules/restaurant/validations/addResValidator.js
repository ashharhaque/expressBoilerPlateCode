const { body } = require("express-validator/check");
const { notify } = require("..");

exports.createResValidation = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("name should not be empty.Please provide a name.")
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("password should not be empty.Please provide a password.")
    .trim(),
  body("email")
    .not().isEmpty()
    .withMessage("email should not be empty.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail()
    .trim(),
    body("phoneNumber")
    .not().isEmpty()
    .withMessage("phoneNumber should not be empty.Please provide a phoneNumber.")
    .isNumeric()
    .withMessage("Phone number cannot contains alphabets or specail characters")
    .isLength({ min: 9 ,max:10})
    .withMessage("please enter a valid phone Number of 9 or 10 digit length.")
    .trim(),
];
