const express = require ('express');
const app = express();
require('./db');
require('dotenv').config();
const userRoutes = require ('./routes/userRoutes');
const taskRoutes = require ('./routes/taskRoutes');

const PORT = 8000;

app.use(express.json());
app.use ('/users', userRoutes);
app.use('/tasks',taskRoutes);


app.listen(PORT , () => {
    console.log(`listening on port ${PORT} .`);
})


