// api/routers/subgenres.js

const express = require('express');
const app = express();
const subgenresRouter = express.Router();

subgenresRouter.get('/', (req, res) => {
    res.send('All subgenres');
});

module.exports = subgenresRouter;