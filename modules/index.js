const express = require("express");
const router = express.Router();
console.log("inside the routesss--->");
// router.use("/product", require("./product"));
router.use("/restaurant",require("./restaurant"))

module.exports=router