const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    language: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book: Book };
