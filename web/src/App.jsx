import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {} from ''

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Header />
				<Routes>
					<Route path='/' element={<AllMovies />} />
					<Route path='/subgenres' element={<Navigate to='/' />} />
					<Route path='/movie/:id' element={<Movie />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
