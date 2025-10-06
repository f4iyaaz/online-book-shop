// This controller is used for deleting books by admin

const { Book } = require("../models/Book");

const deleteBook = async (req, res) => {
  try {
    const { isbn } = req.body;
    const result = await Book.deleteOne({ isbn: isbn });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { deleteBookController: deleteBook };
