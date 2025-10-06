// This file is used for getting all the books from database and show them in the homepage

const { Book } = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).send({ books: allBooks });
  } catch (err) {}
};

module.exports = { getAllBooksController: getAllBooks };
