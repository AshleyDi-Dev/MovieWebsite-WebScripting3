import { useEffect, useState } from "react";
import { Link } from "react-router-dom";    
import { useParams } from "react-router";

function Movie() {

    const { id } = useParams();

    const [movieData, setMovieData] = useState({});

        useEffect(() => {
            fetch(`http://localhost:4000/movies/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovieData(data[0]);
            });
        }, []);

    return (
        <main className="container">
			<div className="grid-container">
				<div className="col-4">
					<img src={`http://localhost:4000/images/${movieData.image_filename}`} />
					</div>
					<div className="col-8">
						<Link to='/' className="button small">
							&lt; All Movies
						</Link>
						<h1
							className="h2 inline-flex items-center">
							{" "}
							{movieData.title} by {movieData.director}
						</h1>
						<p>{movieData.logline}</p>
					</div>
				</div>
			</main>
    );
}

export default Movie;