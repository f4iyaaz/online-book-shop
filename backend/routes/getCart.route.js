const { getCartController } = require("../controllers/getCart.controller");
const { userAuthMiddleware } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.get("/", userAuthMiddleware, getCartController);

module.exports = { getCartRouter: router };
