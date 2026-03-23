// web/src/pages/AllMovies.jsx

// Import Dependencies
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieSubgenresFilter from '../components/MovieSubgenreFilter';
import AddMovieModal from '../components/AddMovieModalForm';
import DeleteMovieModal from '../components/DeleteMovieModal';

function AllMovies() {
    
    // UseState variables that store the movies and filtered info
    // set acts as a function to update the variable
    // Both items are empty until the fetch completes
    const [movies, setMovies] = useState([]);
    const [filtered, setFiltered] = useState([]);

    // Function that gets all movies
    const getAllMovies = function() {
        // Fetches the full movie list from the local API
        fetch("http://localhost:4000/movies")
            // When the response comes back it is parsed into a JSON object
            .then((res) => res.json())
            .then((data) => {
                // Update movies and filtered with data pulled
                setMovies(data);
                setFiltered(data);
            });
    }

    // Function that handles the filter change
    // @NOTE: I did get help from Claude with filtering, as I couldn't find anything on making the filters work in the lecture slides?
    const handleFilterChange = (selected) => {
        // If no filters are selected, show all movies
        if (selected.length === 0) {
            setFiltered(movies);
        } else {
            // Fetch the subgenre info from the local API
            fetch('http://localhost:4000/subgenres')
                // When the response comes back it is parsed into a JSON object
                .then((res) => res.json())
                // Find movie IDs that match the selected subgenres
                // Then filter the movie list to show only those movies
                .then((subgenreData) => {
                    const matchingIds = subgenreData
                        .filter((s) => selected.includes(s.subgenre_name))
                        .map((s) => s.movie_id);
                    setFiltered(movies.filter((movie) => matchingIds.includes(movie.id)));
                });
        }
    };

    // Fetch all movies once when the component first loads
    useEffect(() => {
        getAllMovies();
    }, []);
    
    // What is displayed on the screen
    return (
        <main className='container'>
            <h2>All Horror Movies</h2>
            <div className="grid-container">
                <div className='col-3'>
					<h3>Filters</h3>
                    {/* Filter component
                    When the filter is changed, it runs the handleFilterChange function */}
                    <MovieSubgenresFilter onFilterChange={handleFilterChange}/>
                </div>
                <div className="col-9">
                    <div className="grid-container">
                        {/* Create a card for each movie in the filtered list */}
                        {filtered.map((movie) => {
                            return (
                                <div key={movie.id} className='col-4 flex flex-grow'>
                                    <div className="card">
                                        <img 
                                            src={`http://localhost:4000/images/${movie.image_filename}`} 
                                            alt="placeholder" 
                                        />
                                        {/* Card content */}
                                        <div className='card-content'>
                                            <h3>{movie.title}</h3>
                                            <p>{movie.logline}</p>
                                            <h4>{movie.genres}</h4>
                                            <div className="movie-actions">
                                                {/* Button that links to the specific movie, using the id to get the URL path */}
                                                <Link to={`/movie/${movie.id}`} className='button small'>
                                                View
                                                </Link>
                                                <DeleteMovieModal
                                                    movie={movie}
                                                    onMovieDeleted={getAllMovies}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}

// Exported component 
export default AllMovies;