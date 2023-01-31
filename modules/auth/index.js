const express = require('express');
const router = express.Router();

const {isLoggedIn}=require("./../../utils/isAuthorized/isLoggedIn")

const {loginRestaurant , resetPassword ,forgetPassword, resetForgetPassword}=require("./controllers/controller")

const {loginValidation}=require("./validation/loginValidation");
const {resetPasswordValidation}=require("./validation/resetPasswordValidation");
const {forgetPasswordValidation}=require("./validation/forgetPasswordValidation");
const {restForgetPassValidation}=require("./validation/resetForgetPassValidation");
const {validationResult}=require("./../../utils/responseHandler/errorValidation");

console.log("inside the auth routes---->")

router.post("/",loginValidation,validationResult,loginRestaurant)
router.post("/resetpassword",isLoggedIn,resetPasswordValidation,validationResult,resetPassword);
router.post("/forgetpassword",forgetPasswordValidation,validationResult,forgetPassword);
router.post("/resetforgetpassword",restForgetPassValidation,validationResult,resetForgetPassword)

module.exports = router;
