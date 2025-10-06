const { addToCartController } = require("../controllers/addToCart.controller");
const { userAuthMiddleware } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/", userAuthMiddleware, addToCartController);

module.exports = { addToCartRouter: router };
