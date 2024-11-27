import {useState, useEffect} from 'react';
//import axios from 'axios'; // using axios for api
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import './App.css';

// got from console.log(result) so we know what data to fetch

export interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function App() {
  const [movies, setMovies] = useState<Movies[]>([]); // movies to display
  const [allMovies, setAllMovies] = useState<Movies[]>([]); // all movies from watchedMovies.json
  const [searchQuery, setSearchQuery] = useState(''); // stores searched query

  // Function to fetch watched movies from local JSON
  const fetchWatchedMovies = async () => {
    try {
      const response = await fetch('/watchedMovies.json');
      const data = await response.json();
      const sortedMovies = data.sort((a: Movies, b: Movies) => a.title.localeCompare(b.title));

      setMovies(sortedMovies);
      setAllMovies(sortedMovies);
    } catch (error) {
      console.error("Error fetching watched movies:", error);
    }
  };

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMovies(filteredMovies);
    } else {
      setMovies(allMovies); // Reset to all movies if search query is empty
    }
  }, [searchQuery, allMovies]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="searchBarContainer">
                  <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchBar"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="backButton">
                      back to watchlist
                    </button>
                  )}
                </div>

                <h1 className="pageTitle">
                  {searchQuery === '' ? 'Elina\'s Watchlist' : `Search Results for: ${searchQuery}`}
                </h1>

                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </>
            }
          />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
