// web/src/components/AddMovieModalForm.jsx

// Import dependencies
import { useState } from "react";

function AddMovieModalForm({onClose, onMovieAdded}) {

    // Required fields
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [yearReleased, setYearReleased] = useState("");

    // Optional fields
    const [genres, setGenres] = useState("");
    const [logline, setLogline] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState(null);

    // Sends the form data to the API
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Use FormData so we can include the image file if provided
        const formData = new FormData();

        // Always include the required fields
        formData.append("title", title);
        formData.append("director", director);
        formData.append("year_released", yearReleased);

        // Only include optional fields if they have a value
        if (genres) formData.append("genres", genres);
        if (logline) formData.append("logline", logline);
        if (country) formData.append("country", country);
        if (image) formData.append("image", image);

        // Send the POST request to the API
        const response = await fetch("http://localhost:4000/movies", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        // Notify the parent component and close the modal
        onMovieAdded();
        onClose();
    };

    return (
        <div className="modal-container">
            <div className="modal card">
                <h3>Add a New Movie</h3>
                <form 
                onSubmit={handleFormSubmit} 
                className="form-group grid-container" 
                encType="multipart/form-data">
                    <div className="col-12">

                        {/* Required fields */}
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label htmlFor="director">Director *</label>
                        <input
                            type="text"
                            id="director"
                            name="director"
                            required
                            onChange={(e) => setDirector(e.target.value)}
                        />

                        <label htmlFor="year_released">Year Released *</label>
                        <input
                            type="number"
                            id="year_released"
                            name="year_released"
                            required
                            onChange={(e) => setYearReleased(e.target.value)}
                        />

                        {/* Optional fields */}
                        <label htmlFor="genres">Genres</label>
                        <input
                            type="text"
                            id="genres"
                            name="genres"
                            onChange={(e) => setGenres(e.target.value)}
                        />

                        <label htmlFor="logline">Logline</label>
                        <input
                            type="text"
                            id="logline"
                            name="logline"
                            onChange={(e) => setLogline(e.target.value)}
                        />

                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            onChange={(e) => setCountry(e.target.value)}
                        />

                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="col-12">
                        <button className="button" type="submit">Add Movie</button>
                    </div>
                </form>
                {/* Close the modal without adding */}
                <button className="modal__close-button" onClick={onClose}>x</button>
            </div>
        </div>
    );
}

export default AddMovieModalForm;