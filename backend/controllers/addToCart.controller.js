// This controller is used by user for adding items to cart

const { Cart } = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { items, quantity, status } = req.body;

    const cartExist = await Cart.findOne({ user: user._id });

    if (!cartExist) {
      const cart = new Cart({
        user: user._id, // Automatically assign the userId
        items,
        quantity,
        status: status || "active", // Default to 'active' if no status provided
      });
      await cart.save();
    } else {
      const itemsBook = items[0]["book"].toString();
      const itemExistInCart = cartExist.items.some(
        (cartItem) => cartItem.book.toString() === itemsBook
      );
      if (itemExistInCart) {
        return res.status(400).send("Item already exists in cart");
      } else {
        cartExist.items.push(...items);
        await cartExist.save();
        return res.status(200).send("Added to cart");
      }
    }

    return res.status(200).send("Added to cart");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { addToCartController: addToCart };

/* 

example json request:

{
  "items": [
    {
      "book": "60c72b2f9b1d8d3a9c2b5c77"  // ObjectId of the book (replace with actual book ID)
    }
  ],
  "quantity": 1,  // Quantity of the book
  "status": "active"  // Default status is active, but can also be "purchased"
}


*/