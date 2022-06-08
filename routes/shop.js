// const path = require("path");
const shopController = require("../controllers/shop");
const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");
const router = express.Router();
router.get("/", shopController.getProducts);
router.get("/Cart", shopController.getProducts);
router.get("/products");
router.get("cart");
router.get("/checkout");
exports.routes = router;
