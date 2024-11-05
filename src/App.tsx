import {useState, useEffect} from 'react';
//import axios from 'axios'; // using axios for api
import './App.css';

// got from console.log(result) so we know what data to fetch
interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string
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

  // Effect to fetch movies initially
  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  // Effect to filter movies based on search query
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
    <div className="App">
      
      <div className="searchBarContainer">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Updates the searchQuery state
        />
        
        {searchQuery && (<button onClick={() => setSearchQuery('')} className="homeButton">
          back
        </button>)}
      </div>

      <h1 className="pageTitle">
        {searchQuery === '' ? 'Elina\'s Watchlist' : `Search Results for: ${searchQuery}`}
      </h1>

      {movies.map((items)=> (
        <div className="movieContainer" key={items.id}>
          <h1>{items.title}</h1>

          {items.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w200${items.poster_path}`} alt={`${items.title} Poster`}/>
          )}

          <p>{items.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
