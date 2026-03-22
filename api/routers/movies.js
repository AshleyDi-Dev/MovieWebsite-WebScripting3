const express = require('express');
const app = express();
const moviesRouter = express.Router();
const db = require('../db');

// GET - All
moviesRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// GET - Single
moviesRouter.get('/:id', (req, res) => {
    const { id } =req.params;

    const sql = `
        SELECT movies.*, subgenres.subgenre_name 
        FROM movies 
        JOIN subgenres ON movies.id = subgenres.movie_id 
        WHERE movies.id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// CREATE
moviesRouter.post('/', (req, res) => {
    const { id, title, year_released, genres, director, logline, country, image_filename } = req.body;

    const sql = `
        INSERT INTO movies (id, title, year_released, genres, director, logline, country, image_filename)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [id, title, year_released, genres, director, logline, country, image_filename], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        res.status(201).json(results);
    });
});

// UPDATE
moviesRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year_released, genres, director, logline, country, image_filename } = req.body;

    const sql = `
        UPDATE movies 
        SET title = ?, year_released = ?, genres = ?, director = ?, logline = ?, country = ?, image_filename = ?
        WHERE id = ?`;

    db.query(sql, [title, year_released, genres, director, logline, country, image_filename, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        res.json(results);
    });
});

// DELETE
moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM movies WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        res.status(204).send();
    });
});

module.exports = moviesRouter;