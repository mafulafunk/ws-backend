const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = 4000;
const todoRoutes = require('./routes/todo');
const Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', require('./auth.js'));
app.use('/todos', todoRoutes);

connectDB();

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
