const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    allowHeaders: "Content-Type"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("test that the page is connected");
});

const subgenresRouter = require('./routers/subgenres');
const moviesRouter = require('./routers/movies');

app.use('/subgenres', subgenresRouter);
app.use('/movies', moviesRouter);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});