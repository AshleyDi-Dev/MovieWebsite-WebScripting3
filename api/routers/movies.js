// api/routers/movies.js

// Import dependencies
const express = require('express');                     // Needed to run express
const moviesRouter = express.Router();               // Creates a router for /movies routes
const db = require('../db');                            // Imports the database connection
const upload = require('../storage');

// GET - All
moviesRouter.get('/', (req, res) => {
    // Gives SQL instructions on what to get - Select all from movies
    const sql = 'SELECT * FROM movies';
    // Queries the SQL database
    db.query(sql, (err, results) => {
        // If error, return the following status and message
        if (err) {
            res.status(500).send(err);
            return;
        }
        // If no error, return the results
        res.json(results);
    });
});

// GET - Single
moviesRouter.get('/:id', (req, res) => {
    // Extract ID from the URL
    const { id } =req.params;

    // Used AI to help with LEFT JOIN instead of JOIN so that movies without subgenres still return their data. 
    // A regular JOIN only returns rows where both tables have matching data, so movies with no subgenres would return nothing.
    const sql = `
        SELECT movies.*, subgenres.subgenre_name 
        FROM movies 
        LEFT JOIN movie_subgenres ON movies.id = movie_subgenres.movie_id
        LEFT JOIN subgenres ON subgenres.id = movie_subgenres.subgenre_id
        WHERE movies.id = ?`;

    // Queries the SQL database
    db.query(sql, [id], (err, results) => {
        // If error, return the following status and message
        if (err) {
            res.status(500).send(err);
            return;
        }
        // If no error, return the results
        res.json(results);
    });
});

// CREATE
moviesRouter.post('/', upload.single("image"), (req, res) => {
    // Extract the movie fields from the request body
    const { title, director, year_released, genres, logline, country } = req.body;

    // Start with the required fields
    let sql = 'INSERT INTO movies (title, director, year_released';
    const queryParams = [title, director, year_released];

    // Add optional text fields if they were provided
    if (genres) { sql += ', genres'; queryParams.push(genres); }
    if (logline) { sql += ', logline'; queryParams.push(logline); }
    if (country) { sql += ', country'; queryParams.push(country); }

    // Add image field if a file was uploaded
    if (req.file) {
        sql += ', image_filename';
        queryParams.push(req.file.filename);
    }

    // Close the query
    sql += `) VALUES (${queryParams.map(() => '?').join(', ')})`;

    // Queries the SQL database
    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }
        res.status(201).json(results);
    });
});


// UPDATE
moviesRouter.put('/:id', upload.single("image"), (req, res) => {
    // Extract ID from the URL
    const { id } = req.params;
    // Extract the updated movie fields from the request body
    const { title, year_released, genres, director, logline, country } = req.body;

    // Start with the required fields
    let sql = `
        UPDATE movies 
        SET title = ?, year_released = ?, genres = ?, director = ?, logline = ?, country = ?`;
    const queryParams = [title, year_released, genres, director, logline, country];

    // Only update image if a new one is uploaded
    if (req.file) {
        sql += `, image_filename = ?`;
        queryParams.push(req.file.filename);
    }

    sql += ` WHERE id = ?`;
    queryParams.push(id);

    // Queries the SQL database
    db.query(sql, queryParams, (err, results) => {
        // If error, return the following status and message
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        // If no error, return the results
        res.json(results);
    });
});

// DELETE - Remove a movie by ID
moviesRouter.delete('/:id', (req, res) => {
    // Extract ID from the URL
    const { id } = req.params;

    // @NOTE: Used AI to help with this part
    // Step 1 - Delete the links between this movie and its subgenres
    // This does NOT delete the subgenres themselves, just the connections
    const deleteLinksSql = 'DELETE FROM movie_subgenres WHERE movie_id = ?';
    db.query(deleteLinksSql, [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }
        // Step 2 - Now safe to delete the movie itself
        // The ? is a safe placeholder for the ID to prevent SQL injection
        const deleteMovieSql = 'DELETE FROM movies WHERE id = ?';
        db.query(deleteMovieSql, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('An error occurred');
            }
            // Return a 204 (No Content) status to confirm deletion
            res.status(204).send();
        });
    });
});

// Export
module.exports = moviesRouter;