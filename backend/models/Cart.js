const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  items: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      }
    }
  ],
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "purchased"], 
    default: "active"
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart: Cart };
