// web/src/components/AddMovieModal.jsx

import { useState } from "react";

function AddMovieModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button className="button" onClick={() =>
                setShowModal(true)} >
                Add Movie
            </button>
        </div>
    );
}

export default AddMovieModal;