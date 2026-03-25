// web/src/components/UpdateMovieModal.jsx

// Import Dependencies
import { useState } from "react";
import { createPortal } from "react-dom";
import UpdateMovieModalContent from "./UpdateMovieModalContent";

function UpdateMovieModal({ onMovieUpdated, movie }) {

// Tracks if the modal is open or closed
    const [showModal, setShowModal] = useState(false);

    return(
        <>
            {/* Button that opens the modal */}
            <button
                className="button small warning"
                onClick={ () => { setShowModal(true) }}
            >Edit</button>

            { showModal && createPortal(<UpdateMovieModalContent 
            	// onClose is a function that will be passed down to set the state to false. This is will remove the modal from the DOM
                onClose={ () => { setShowModal(false) } } 
                movie={movie} 
                onMovieUpdated={onMovieUpdated} />, 
                document.body) }
        </>
    );
}

// Export component
export default UpdateMovieModal;