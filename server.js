const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/todos', require('./auth'));
app.use('/todos', require('./routes/todo'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
