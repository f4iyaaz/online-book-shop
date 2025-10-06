const { registerController } = require("../controllers/register.controller");

const express = require("express");
const router = express.Router();

router.post("/", registerController);

module.exports = { registerRouter: router };
