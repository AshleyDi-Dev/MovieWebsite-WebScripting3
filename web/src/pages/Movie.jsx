// web/src/pages/Movie.jsx

// Import Dependencies
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";    
import { useParams } from "react-router";

function Movie() {

    // Get the "id" from the URL path
    const { id } = useParams();

    // UseState variables that store the movieData and subgenre info
    // set acts as a function to update the variable
    // Both items are empty until the fetch completes
    const [movieData, setMovieData] = useState({});
    const [subgenres, setSubgenres] = useState([]);

        // Runs after the component renders
        useEffect(() => {
            // Fetches the local API using the "id" from the URL
            fetch(`http://localhost:4000/movies/${id}`)
            // When the response comes back it is parsed into a JSON object
            .then((response) => response.json())
            .then((data) => {
                // Grab the first row of movie information
                setMovieData(data[0]);
                // Extract the subgenre_name field from every row into a new array
                setSubgenres(data.map((item) => item.subgenre_name));
            });
        }, []);

    // What is displayed on the screen
    return (
        <main className="container">
			<div className="grid-container">
                {/* Left column: movie poster image */}
				<div className="col-4">
                    {/* Builds the image URL using the filename stored in movieData */}
					<img src={`http://localhost:4000/images/${movieData.image_filename}`} />
					</div>
                    {/* Right column: movie details */}
					<div className="col-8">
                        {/* Back button that navigates to all movies at "/" */}
						<Link to='/' className="button small">
							&lt; All Movies
						</Link>
                        {/* Movie title as an H1 element */}
						<h1
							className="h2 inline-flex items-center">
							{" "}
							{movieData.title}
						</h1>
                        {/* Director as an H2 element */}
                        <h2>by {movieData.director}</h2>
                        {/* Genere as a p element */}
						<p>{movieData.genres}</p>
                        {/* Subgenere array joined into a comma seperated string */}
                        <p>{subgenres.join(', ')}</p>
                        {/* Logline as a p element */}
                        <p>{movieData.logline}</p>
                        {/* Year Released + Country as p elements */}
                        <p>{movieData.year_released} - {movieData.country}</p>
					</div>
				</div>
			</main>
    );
}

// Exported component 
export default Movie;