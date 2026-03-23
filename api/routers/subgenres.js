// api/routers/subgenres.js

// Import dependencies
const express = require('express');                     // Needed to run express
const subgenresRouter = express.Router();               // Creates a router for /subgenre routes
const db = require('../db');                            // Imports the database connection

// GET all subgenres
subgenresRouter.get('/', (req, res) => {
    // Gives SQL instructions on what to get - Select all from subgenres
    const sql = 'SELECT * FROM subgenres';
    // Queries the SQL database
    db.query(sql, (err, results) => {
        // If error, return the following status and message
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        // If no error, return the results
        res.json(results);
    });
});

// GET single subgenre
subgenresRouter.get('/:id', (req, res) => {
    // Extract ID from the URL
    const { id } = req.params;
    // Gives SQL instructions on what to get - Select a subgenre by ID.
    const sql = 'SELECT * FROM subgenres WHERE id = ?';
    // Queries the SQL database
    db.query(sql, [id], (err, results) => {
        // If error, return the following status and message
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        // If no error, return the results
        res.json(results[0]);
    });
});

// Export
module.exports = subgenresRouter;