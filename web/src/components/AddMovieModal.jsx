// web/src/components/AddMovieModal.jsx

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
					<AddMovieModalForm
						onMovieAdded={onMovieAdded}
						// onClose is a function that will be passed down to set the state to false. This is will remove the modal from the DOM
						onClose={() => setShowModal(false)}
					/>,
					document.body,
				)}
		</div>
	);
}

export default AddMovieModal;


