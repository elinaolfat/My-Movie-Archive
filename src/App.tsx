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
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

function App() {
  const [movies, setMovies] = useState<Movies[]>([]); // movies to display
  const [allMovies, setAllMovies] = useState<Movies[]>([]); // all movies from watchedMovies.json
  const [searchQuery, setSearchQuery] = useState(''); // stores searched query
  const [genres, setGenres] = useState<Genre[]>([]); // Stores fetched genres
  const [selectedGenre, setSelectedGenre] = useState('All'); // Currently selected genre filter
  const [selectedYear, setSelectedYear] = useState("All"); // Currently selected year filter

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

  const fetchGenres = async () => {
    try {
      const response = await fetch('/genres.json'); // Update path if necessary
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchWatchedMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    let filteredMovies = allMovies;

  // Apply search query filter if there's a search
  if (searchQuery) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply genre filter if it's not 'All'
  if (selectedGenre !== 'All') {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre_ids.some((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre?.name === selectedGenre;
      })
    );
  }
  if (selectedYear !== 'All') {
    filteredMovies = filteredMovies.filter((movie) => {
      const releaseYear = movie.release_date.split('-')[0]; // Extract year from release_date
      return releaseYear === selectedYear;
    });
  }

  // Set the final filtered list to state
  setMovies(filteredMovies);
  }, [searchQuery, selectedGenre, selectedYear, allMovies, genres]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="pageTitleContainer">
                  <h1 className="pageTitle">ELINA'S MOVIE ARCHIVE</h1>
                </div>

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
                      back to archive
                    </button>
                  )}
                </div>

                <div className="filterContainer">
                <label>
                  Browse by:
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="filterDropdown"
                  >
                    <option value="All">All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.name}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
              

                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="filterDropdown" // Reusing the same class for consistent styling
                  >
                    <option value="All">All Years</option>
                    {Array.from(new Set(allMovies.map((movie) => movie.release_date.split('-')[0])))
                      .sort((a, b) => parseInt(b) - parseInt(a))
                      .map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                  </label>
              </div>

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
