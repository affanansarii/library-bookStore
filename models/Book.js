const mongoose = require('mongoose');

const book = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("books", book)