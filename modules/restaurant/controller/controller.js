const {
    sendSuccessResponse,
    sendErrorResponse,
  } = require("./../../../utils/responseHandler/response");
  const { addRestaurantSer } = require("./../services/restaurantServices");
  const addRestaurant = async (req, res) => {
    try {
      console.log("inside the restaurant controller--->");
      const data = await addRestaurantSer(req);
     
      return sendSuccessResponse(res,data);
    } catch (err) {
      console.log("inside the addRestaurantSer Error--->", err.message);
      return sendErrorResponse(res,err);
    }
  };
  
  module.exports = { addRestaurant };