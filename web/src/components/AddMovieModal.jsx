// web/src/components/AddMovieModalForm.jsx

/////// @NOTE: NEED HELP WITH THIS. HOW WOULD I DO THIS SINCE MOVIES COULD HAVE THE SAME TITLE + DO I NEED TO HAVE EVERY SINGLE OPTION THERE TO UPDATE? OR COULD I ONLY ASK FOR A FEW AND THE OTHERS WOULD BE FILLED IN ON THE DATABASE LATER.

// Import dependencies
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AddMovieModalForm from './AddMovieModalForm';

function AddMovieModal({onMovieAdded}) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<button className='button' onClick={() => setShowModal(true)}>
				+ Add Movie +
			</button>

			{showModal &&
				createPortal(
					<AddMovieModal
						onTapeAdded={onTapeAdded}
						// onClose is a function that will be passed down to set the state to false. This is will remove the modal from the DOM
						onClose={() => setShowModal(false)}
					/>,
					document.body,
				)}
		</div>
	);
}

export default AddMovieModal;


