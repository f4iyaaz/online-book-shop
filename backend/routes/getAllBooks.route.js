// This route is used for getting all books from database to show in the homepage

const { getAllBooksController } = require("../controllers/getAllBooks.controller");

const express = require("express");
const router = express.Router();

router.get("/", getAllBooksController);

module.exports = { getAllBooksRouter: router };
