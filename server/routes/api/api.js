var express = require("express");
var router = express.Router();
var personRoutes = require("./person_routes");
var productRoutes = require("./product_routes");
var AuthController = require("../../controllers/AuthController");

router.use(AuthController.check_token);

router.use("/people", personRoutes);
router.use("/products", productRoutes);

module.exports = router;
