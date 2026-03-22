// api/server.js

const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const PORT = 4000;

const subgenresRouter = require('./routers/subgenres');
const moviesRouter = require('./routers/movies');

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type"
};

app.use(cors(corsOptions));
app.use(express.json()); // CHECK
app.use('/images', express.static('images')); // CHECK
app.use('/subgenres', subgenresRouter);
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});