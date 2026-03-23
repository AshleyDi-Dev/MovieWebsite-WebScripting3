// api/server.js

// Variables
const express = require('express');             // Needed to run express
const app = express();                          // Creates the server
const cors = require('cors');                   // Needed for front-end/back-end connection without error
const db = require('./db');                     // Imports the database connection
const PORT = 4000;                              // Stores the PORT

// Routers
const subgenresRouter = require('./routers/subgenres');
const moviesRouter = require('./routers/movies');

// Configure CORS to only allow requests from React
const corsOptions = {
    origin: "http://localhost:5173",            // Only from this URL
    methods: "GET, POST, PUT, DELETE",          // Only these methods
    allowedHeaders: "Content-Type"              // Allow this header in requests
};

// Middlewear
app.use(cors(corsOptions));                     // Apply CORS rules to all incoming requests
app.use(express.json());                        // Parse incoming JSON request bodies
app.use('/images', express.static('images'));   // Has the images folder as a public static directoy
// Requests to these routes use appropriate routers
app.use('/subgenres', subgenresRouter);
app.use('/movies', moviesRouter);

// Listen for changes on PORT 400
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});