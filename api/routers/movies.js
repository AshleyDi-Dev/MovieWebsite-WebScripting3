// api/routers/movies.js

// Import dependencies
const express = require('express');                     // Needed to run express
const moviesRouter = express.Router();               // Creates a router for /movies routes
const db = require('../db');                            // Imports the database connection

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

    // Gives SQL instrctions on what to get - All columns from the movie table plus the subgenre_name column from the subgenre table. Connect the tables where the movie's ID matches the movie_id in the subgenre table. Return the movies that matches the ID in the URL
    const sql = `
        SELECT movies.*, subgenres.subgenre_name 
        FROM movies 
        JOIN movie_subgenres ON movies.id = movie_subgenres.movie_id
        JOIN subgenres ON subgenres.id = movie_subgenres.subgenre_id
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
moviesRouter.post('/', (req, res) => {
    // Extract the movie fields from the request body
    const { id, title, year_released, genres, director, logline, country, image_filename } = req.body;

    // Query to insert a new movie. Each ? is a placeholder for the values above
    const sql = `
        INSERT INTO movies (id, title, year_released, genres, director, logline, country, image_filename)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Queries the SQL database
    db.query(sql, [id, title, year_released, genres, director, logline, country, image_filename], (err, results) => {
        // If error, return the following status and message
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        // If no error, return the results
        res.status(201).json(results);
    });
});

// UPDATE
moviesRouter.put('/:id', (req, res) => {
    // Extract ID from the URL
    const { id } = req.params;
    // Extract the updated movie fields from the request body
    const { title, year_released, genres, director, logline, country, image_filename } = req.body;

    // Query to update a movie. Each ? is a placeholder for the values above
    const sql = `
        UPDATE movies 
        SET title = ?, year_released = ?, genres = ?, director = ?, logline = ?, country = ?, image_filename = ?
        WHERE id = ?`;

    // Queries the SQL database
    db.query(sql, [title, year_released, genres, director, logline, country, image_filename, id], (err, results) => {
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