const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = require('express').Router();
const { authenticateToken } = require('./userAuth');
const Book = require('../models/Book');

router.post('/add-book', authenticateToken, async (req, res) => {
    try {

        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(400).json({ message: "Access denied" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            description: req.body.description,
        });
        await book.save();
        res.status(200).json({ message: "book added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.put('/update-book', authenticateToken, async (req, res) => {
    try {

        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            description: req.body.description,
        });
        res.status(200).json({ message: "book updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.delete('/delete-book', authenticateToken, async (req, res) => {

    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

})

router.get('/get-all-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({ status: "Success", data: books });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({ status: "Success", data: book });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/get-recent-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;