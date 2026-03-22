// api/routers/subgenres.js

const express = require('express');
const subgenresRouter = express.Router();
const db = require('../db');

// GET all subgenres
subgenresRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM subgenres';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        res.json(results);
    });
});

// GET single subgenre
subgenresRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM subgenres WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        res.json(results[0]);
    });
});

module.exports = subgenresRouter;