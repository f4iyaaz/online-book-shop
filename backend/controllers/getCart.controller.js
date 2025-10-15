const { Cart } = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const { _id, fullName } = req.user;
    const cart = await Cart.findOne({ user: _id });
    return res.status(200).send({ cart });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { getCartController: getCart };
