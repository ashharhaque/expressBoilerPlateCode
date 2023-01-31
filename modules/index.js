const express = require("express");
const router = express.Router();
console.log("inside the routesss--->");
router.use("/product", require("./product"));
router.use("/auth", require("./auth"));

module.exports=router