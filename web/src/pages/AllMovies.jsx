import { useState, useEffect } from 'react';

function AllMovies() {
    
    const [movies, setMovies] = useState([]);

    const getAllMovies = function() {
        fetch("http://localhost:4000/movies")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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
                {movies.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <div className="card">
                                <img 
                                    src={`http://localhost:4000/images/${movie.image_filename}`} 
                                    alt="placeholder" 
                                />
                                <div className='card-content'>
                                    <h3>{movie.title}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default AllMovies;