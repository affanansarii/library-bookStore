const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = require('express').Router();
const { authenticateToken } = require('./userAuth');

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (username.length <= 4) return res.status(400).json({ message: "Username length should be greater than 3" });

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) return res.status(400).json({ message: "Username already exists" });

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) return res.status(400).json({ message: "Email already exists" });

        if (password <= 5) return res.status(400).json({ message: "Password length should be greater than 5" });

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ username: username, email: email, password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ message: "Signed up successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ message: "Invalid credentials" });

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [{ name: existingUser.username }, { role: existingUser.role }]
                const token = jwt.sign({ authClaims }, "library123", { expiresIn: '30d' })
                res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/get-user-information', authenticateToken, async (req, res) => {

    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = router;