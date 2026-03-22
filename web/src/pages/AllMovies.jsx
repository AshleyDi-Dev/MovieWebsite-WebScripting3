import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllMovies() {
    
    const [movies, setMovies] = useState([]);

    const getAllMovies = function() {
        fetch("http://localhost:4000/movies")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
            });
    }

    useEffect(() => {
        getAllMovies();
    }, []);
    
    
    return (
        <main className='container'>
            <h2>All Horror Movies</h2>
            <div className="grid-container">
                <div className="col-12">
                    <div className="grid-container">
                        {movies.map((movie) => {
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
                                                <Link to={`/movies/${movie.id}`} className='button small'>
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