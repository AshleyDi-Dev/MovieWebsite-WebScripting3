// web/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import AllMovies from "./pages/AllMovies";
import Movie from "./pages/Movie";
import Footer from "./components/Footer";
import "./App.css";

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
				<Footer/>
			</div>
		</BrowserRouter>
	);
}

export default App;
