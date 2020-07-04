var express = require("express");
var router = express.Router();
var authRoutes = require("./auth_routes");

router.use("/", authRoutes);

module.exports = router;
