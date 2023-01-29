const express = require('express');
const router = express.Router();

const {addProduct}=require("./controller/controller")

console.log("inside the product routes---->")

router.post("/product",addProduct)

module.exports = router;
