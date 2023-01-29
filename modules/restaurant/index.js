const express = require('express');
const router = express.Router();

const {createResValidation}=require("./validations/addResValidator");
const {validationResult}=require("./../../utils/responseHandler/errorValidation")

const {addRestaurant}=require("./controller/controller")

console.log("inside the restaruant routes---->")

router.post("/",createResValidation,validationResult,addRestaurant)

module.exports = router;