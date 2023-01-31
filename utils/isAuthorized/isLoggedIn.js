const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const RestaurantModel = require("./../../model/restaurant");

const isLoggedIn = async (req, res, next) => {
  try {
    console.log("req.headers in isLoggedIn---->", req.headers["x-auth-token"]);
    const headerToken = req.headers["x-auth-token"];
    const restaurant = await RestaurantModel.findOne(
      { token: headerToken },
      { email: 1, phoneNumber: 1, name: 1,password:1 }
    ).lean();
    let decoded = jwt.verify(headerToken,process.env.JWT_SECRET_KEY);
    console.log("decoded in isLoggedIn middleware----->",restaurant);
    if(!decoded){
        throw new Error("there is no decoded");
        return;
    }
    req.loggedInUser=restaurant;
    next()

  } catch (err) {
    return res.status(401).json({
        status:401,
        message:"Please login.",
        data:{

        }
    })
    // err
  }
};

module.exports = { isLoggedIn };
