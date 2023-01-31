const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("./../../../utils/responseHandler/response");
const {
  loginRestaurantSer,
  resetPasswordSer,
  forgetPasswordSer,
  resetForgetPasswordSer,
} = require("./../services/authServices");
const loginRestaurant = async (req, res) => {
  try {
    console.log("inside the login restaurant controller--->");
    const data = await loginRestaurantSer(req);
    return sendSuccessResponse(res, data);
  } catch (err) {
    console.log("inside the login restaurant Error--->", err.message);
    return sendErrorResponse(res, err);
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("inside the resetPassword restaurant controller--->");
    const data = await resetPasswordSer(req);
    return sendSuccessResponse(res, data);
  } catch (err) {
    console.log("inside the resetPassword restaurant Error--->", err.message);
    return sendErrorResponse(res, err);
  }
};

const forgetPassword = async (req, res) => {
  try {
    console.log("inside the forgetPassword restaurant controller--->");
    const data = await forgetPasswordSer(req);
    return sendSuccessResponse(res, data);
  } catch (err) {
    console.log("inside the forgetPassword restaurant Error--->", err.message);
    return sendErrorResponse(res, err);
  }
};

const resetForgetPassword = async (req, res) => {
  try {
    console.log("inside the forgetPassword restaurant controller--->");
    const data = await resetForgetPasswordSer(req);
    return sendSuccessResponse(res, data);
  } catch (err) {
    console.log("inside the forgetPassword restaurant Error--->", err.message);
    return sendErrorResponse(res, err);
  }
};
module.exports = {
  loginRestaurant,
  resetPassword,
  forgetPassword,
  resetForgetPassword,
};
