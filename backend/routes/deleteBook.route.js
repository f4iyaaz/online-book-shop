// This route is used by admin to delete a book from database

const { deleteBookController } = require("../controllers/deleteBook.controller");
const { adminAuthMiddleware } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/", adminAuthMiddleware, deleteBookController);

module.exports = { deleteBookRouter: router };
