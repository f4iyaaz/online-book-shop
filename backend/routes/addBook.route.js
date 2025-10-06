// This route is used for adding books in the database by admin

const { addBookController } = require("../controllers/addBook.controller");
const { adminAuthMiddleware } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/", adminAuthMiddleware, addBookController);

module.exports = { addBookRouter: router };
