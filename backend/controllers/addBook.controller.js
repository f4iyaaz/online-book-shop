// This controller is used for adding new books in the database by admin

const { Book } = require("../models/Book");

const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      stock,
      language,
      categories,
      coverImageUrl,
      isbn,
    } = req.body;

    const book = new Book({
      title,
      author,
      description,
      price,
      stock,
      language,
      categories,
      coverImageUrl,
      isbn,
    });

    await book.save();

    return res.status(200).send({ message: "book added successfully!" });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { addBookController: addBook };
