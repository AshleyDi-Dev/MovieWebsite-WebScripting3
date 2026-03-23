// web/src/components/DeleteMovieModal.jsx

// @NOTE: TRY THIS - NOT SURE IF ITS RIGHT

// Import dependencies
import { useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteMovieModalContent from './DeleteMovieModalContent';

function DeleteMovieModal( {movie, onMovieDeleted }) {

    // Tracks if the modal is open or closed
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Button that opens the modal */}
            <button
                className='button small delete'
                onClick={ () => { setShowModal(true) } }
            >Delete</button>

            {/* If showModal is true, render the modal into document.body using a portal */}
            {showModal && createPortal(
                <DeleteMovieModalContent
                    movie={movie}
                    onMovieDeleted={onMovieDeleted}
                    // Closes the modal
                    onClose={ () => { setShowModal( false )}}
                />,
                document.body)}

        </>
    )

}

// Export component
export default DeleteMovieModal;