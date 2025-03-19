const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./conn/conn')
const user = require('./routes/user')
const book = require('./routes/book')

app.use(cors());
app.use(express.json());

app.use('/api/v1', user);
app.use('/api/v1', book);

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
})