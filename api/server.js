const express = require('express');
const app = express();
const PORT = 4000;

// app.get('/', (req, res) => {
//     res.send("hello world");
// });

const subgenresRouter = require('./routers/subgenres');
const moviesRouter = require('./routers/movies');

app.use('/subgenres', subgenresRouter);
app.use('/movies', moviesRouter);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});