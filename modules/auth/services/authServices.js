const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RestaurantModel = require("./../../../model/restaurant");

const loginRestaurantSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("inside add loginRestauant servicess--->", req.body);
      const { email, password } = req.body;
      let restaurant = await RestaurantModel.findOne(
        { email: email },
        { email: 1, password: 1, phoneNumber: 1 }
      ).lean();
      if (!restaurant) {
        return resolve({
          status: 404,
          message: `There is no such restaurant with email ${email}`,
          data: {},
        });
      }

      let passwordMatch = await bcrypt.compare(password, restaurant.password);
      if (!passwordMatch) {
        return resolve({
          status: 401,
          message: "Password do not match.Please Provide a correct password",
          data: {},
        });
      }
      const token = jwt.sign(
        { phoneNumber: restaurant.phoneNumber, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "20h",
        }
      );
      restaurant = await RestaurantModel.findOneAndUpdate(
        { email },
        { token: token },
        { new: true }
      )
        .select("name email phoneNumber")
        .lean();
      return resolve({
        status: 200,
        message: "Successfully logged in",
        data: {
          ...restaurant,
          token: token,
        },
      });
    } catch (err) {
      console.log("inside login restauant error--->", err.message);
      reject({
        status: 500,
        message: err.message,
        data: err,
      });
    }
  });
};

const resetPasswordSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("inside the resetPasswordSer----->", req.loggedInUser);
      const { currentPassword, newPassword } = req.body;
      let passwordMatch = await bcrypt.compare(
        currentPassword,
        req.loggedInUser.password
      );
      if (!passwordMatch) {
        return resolve({
          status: 400,
          message:
            "Your Password do not match with current password.Please Provide a correct password",
          data: {},
        });
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const restaurant = await RestaurantModel.findOneAndUpdate(
        { _id: req.loggedInUser._id },
        { password: hashedPassword },
        { new: true }
      )
        .select("name phoneNumber email")
        .lean();
      return resolve({
        status: 200,
        message: "Successfully reset the password.",
        data: {
          ...restaurant,
        },
      });
    } catch (err) {
      console.log("inside resetPassword restauant error--->", err.message);
      reject({
        status: 500,
        message: err.message,
        data: err,
      });
    }
  });
};

const forgetPasswordSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email } = req.body;
      let otp = Math.floor(1000 + Math.random() * 9000);
      let forgetPasswordOtpExpiresIn =
        Date.now() + Number(process.env.FORGET_PASSWORD_OTP_EXPIRES_IN);
     
      let restaurant = await RestaurantModel.findOneAndUpdate(
        { email: email },
        {
          forgetPasswordOtp: otp,
          forgetPasswordOtpExpiresIn: forgetPasswordOtpExpiresIn,
        },
        { new: true }
      )
        .select("name email")
        .lean();
      if (!restaurant) {
        return resolve({
          status: 404,
          message: `There is no such store with email ${email}.Please sign up first.`,
          data: {},
        });
      }
      // email to be send with otp functionality
      return resolve({
        status: 200,
        message:
          "Successfully generated the otp for the forget password reset.Please fill the otp.",
        data: {
          ...restaurant,
        },
      });
    } catch (err) {
      console.log("inside forgetPassword restauant error--->", err.message);
      reject({
        status: 500,
        message: err.message,
        data: err,
      });
    }
  });
};

const resetForgetPasswordSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password, otp } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const restaurant = await RestaurantModel.findOneAndUpdate(
        { email: email, forgetPasswordOtp: otp },
        { password: hashedPassword },
        { new: true }
      )
        .select("name email phoneNumber")
        .lean();
      if (!restaurant) {
        return resolve({
          status: 404,
          message: "Please provide correct email or otp.",
          data: {},
        });
      }
      if (restaurant?.forgetPasswordOtpExpiresIn < Date.now()) {
        return resolve({
          status: 202,
          message: "Otp expired",
          data: {},
        });
      }

      return resolve({
        status: 200,
        message: "Successfully reset the password.",
        data: {
          ...restaurant,
        },
      });
    } catch (err) {
      console.log(
        "inside resetforgetPassword restauant error--->",
        err.message
      );
      reject({
        status: 500,
        message: err.message,
        data: err,
      });
    }
  });
};

module.exports = {
  loginRestaurantSer,
  resetPasswordSer,
  forgetPasswordSer,
  resetForgetPasswordSer,
};
