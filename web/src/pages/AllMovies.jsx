// web/src/pages/AllMovies.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddMovieModal from '../components/AddMovieModal';
import MovieSubgenresFilter from '../components/MovieSubgenreFilter';

function AllMovies() {
    
    const [movies, setMovies] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const getAllMovies = function() {
        fetch("http://localhost:4000/movies")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
                setFiltered(data);
            });
    }

    const handleFilterChange = (selected) => {
        if (selected.length === 0) {
            setFiltered(movies);
        } else {
            fetch('http://localhost:4000/subgenres')
                .then((res) => res.json())
                .then((subgenreData) => {
                    const matchingIds = subgenreData
                        .filter((s) => selected.includes(s.subgenre_name))
                        .map((s) => s.movie_id);
                    setFiltered(movies.filter((movie) => matchingIds.includes(movie.id)));
                });
        }
    };

    useEffect(() => {
        getAllMovies();
    }, []);
    
    return (
        <main className='container'>
            <h2>All Horror Movies</h2>
            <div className="grid-container">
                <div className='col-3'>
					<h3>Filters</h3>
                    <MovieSubgenresFilter onFilterChange={handleFilterChange}/>
                </div>
                <div className="col-9">
                    <div className="grid-container">
                        {filtered.map((movie) => {
                            return (
                                <div key={movie.id} className='col-4 flex flex-grow'>
                                    <div className="card">
                                        <img 
                                            src={`http://localhost:4000/images/${movie.image_filename}`} 
                                            alt="placeholder" 
                                        />
                                        <div className='card-content'>
                                            <h3>{movie.title}</h3>
                                            <p>{movie.logline}</p>
                                            <h4>{movie.genres}</h4>
                                            <div className="movie-actions">
                                                <Link to={`/movie/${movie.id}`} className='button small'>
                                                View
                                                </Link>
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

export default AllMovies;