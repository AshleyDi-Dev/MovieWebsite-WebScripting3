// web/src/components/DeleteMovieModalContent.jsx

// @NOTE: Add in here a CONFIRMATION that the movie was deleted.

function DeleteMovieModalContent( {movie, onClose, onMovieDeleted }) {
    // Handles the delete request when the form is submitted
    const handleDeleteMovie = (event) => {
        // Prevents the form from refreshing the page on submit
        event.preventDefault();
        // Sends a delete request to the API for this specific movie
        fetch(`http://localhost:4000/movies/${movie.id}`,
            { method: "DELETE"})
            .then((res) => {
                onMovieDeleted(); // Tell the parent component the movie was deleted
                onClose();        // Close the modal
                alert(`${movie.title} has been deleted!`);
            })
    };

    return (
        <div className="modal-container">
            <div className="modal card">
                <h3>
                    Are you sure you want to delete {movie.title} by {movie.director}?
                </h3>
                {/* Calls handleDeleteMovie when the form is submitted  */}
                <form onSubmit={handleDeleteMovie}>
                    <button className="button delete" type="submit">
                        Yes, delete this movie!
                    </button>
                </form>
                {/* Close the modal without deleting */}
                <button className="modal__close-button" onClick={onClose}>
                    x
                </button>
            </div>
        </div>
    );
}

// Export component
export default DeleteMovieModalContent;