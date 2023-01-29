const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("./../../../utils/responseHandler/response");
const { addProductSer } = require("./../services/productSer");
const addProduct = async (req, res) => {
  try {
    console.log("inside the controller--->");
    const data = await addProductSer(req);
    return sendSuccessResponse(res,data);
  } catch (err) {
    console.log("inside the addProduct Error--->", err.message);
    return sendErrorResponse(res);
  }
};

module.exports = { addProduct };
