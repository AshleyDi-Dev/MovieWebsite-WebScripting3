// web/src/components/UpdateMovieModalContent.jsx

import { useState } from "react";

function UpdateMovieModalContent({ movie, onClose, onMovieUpdated }) {

    // Pre-populate all fields with existing movie data using ?? 
    // ?? means "use this value, or empty string if it's null/undefined"
    const [title, setTitle] = useState(movie.title ?? "");
    const [director, setDirector] = useState(movie.director ?? "");
    const [yearReleased, setYearReleased] = useState(movie.year_released ?? "");
    const [genres, setGenres] = useState(movie.genres ?? "");
    const [logline, setLogline] = useState(movie.logline ?? "");
    const [country, setCountry] = useState(movie.country ?? "");
    const [image, setImage] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Use FormData so we can include the image file if provided
        const formData = new FormData();
        formData.append("title", title);
        formData.append("director", director);
        formData.append("year_released", yearReleased);
        formData.append("genres", genres);
        formData.append("logline", logline);
        formData.append("country", country);

        // Only append image if a new one was selected
        if (image) formData.append("image", image);

        const response = await fetch(`http://localhost:4000/movies/${movie.id}`, {
            method: "PUT",
            body: formData,
        });

        const result = await response.json();

        onMovieUpdated();
        onClose();
    };

    return (
        <div className="modal-container">
            <div className="modal card">
                <h3>Edit Movie</h3>
                <form
                    onSubmit={handleFormSubmit}
                    className="form-group grid-container"
                    encType="multipart/form-data"
                >
                    <div className="col-12">

                        {/* Required fields */}
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label htmlFor="director">Director *</label>
                        <input
                            type="text"
                            id="director"
                            name="director"
                            value={director}
                            required
                            onChange={(e) => setDirector(e.target.value)}
                        />

                        <label htmlFor="year_released">Year Released *</label>
                        <input
                            type="number"
                            id="year_released"
                            name="year_released"
                            value={yearReleased}
                            required
                            onChange={(e) => setYearReleased(e.target.value)}
                        />

                        {/* Optional fields */}
                        <label htmlFor="genres">Genres</label>
                        <input
                            type="text"
                            id="genres"
                            name="genres"
                            value={genres}
                            onChange={(e) => setGenres(e.target.value)}
                        />

                        <label htmlFor="logline">Logline</label>
                        <input
                            type="text"
                            id="logline"
                            name="logline"
                            value={logline}
                            onChange={(e) => setLogline(e.target.value)}
                        />

                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />

                        {/* Show current image and option to upload new one */}
                        <label>Current Image</label>
                        <img
                            src={`http://localhost:4000/images/${movie.image_filename}`}
                            alt="Current movie image"
                            style={{ maxHeight: '150px', width: 'auto' }}
                        />

                        <label htmlFor="image">Upload New Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="col-12">
                        <button className="button" type="submit">Save</button>
                    </div>
                </form>
                {/* Close the modal without saving */}
                <button className="modal__close-button" onClick={onClose}>x</button>
            </div>
        </div>
    );
}

export default UpdateMovieModalContent;