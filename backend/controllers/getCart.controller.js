const { Cart } = require("../models/Cart");
const { Book } = require("../models/Book");

const getCart = async (req, res) => {
  try {
    const { _id, fullName } = req.user;
    const cart = await Cart.findOne({ user: _id });
    const cartItems = cart["items"];
    let books = [];
    for (const item of cartItems) {
      const book = await Book.findOne({ _id: item["book"] });
      books.push(book["title"]);
    }
    return res.status(200).send({ user: fullName, books: books });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { getCartController: getCart };
