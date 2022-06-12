// const path = require("path");
const shopController = require("../controllers/shop");
const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");
const router = express.Router();
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.get("/checkout", shopController.getCheckout);

exports.routes = router;
