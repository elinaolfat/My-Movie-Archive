import {useState, useEffect} from 'react';
import axios from 'axios'; // using axios for api
import './App.css';

// got from console.log(result) so we know what data to fetch
interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string
}

function App() {
  const [movies, setMovies] = useState<Movies[]>([]); // movies stores data, setMovies sets the data after fetching
  const [searchQuery, setSearchQuery] = useState(''); // stores searched query

  const apiKey = "a8df0bc1e84c757fef12cc328a2e8411";
  const popular = "https://api.themoviedb.org/3/movie/popular"; // api popular movies endpoint
  const search = "https://api.themoviedb.org/3/search/movie"; // api search endpoint

  /*useEffect(()=>{
    fetchData();
  }, [searchQuery])*/

  /*const fetchData = () => {
    const url = searchQuery ? `${search}?api_key=${apiKey}&query=${searchQuery}` : `${popular}?api_key=${apiKey}`;
    axios.get(url).then((response) => {
      setMovies(response.data.results);
    });
    /*
     axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results; // holds info returned by the link
      //console.log(result); // to see format of results

      setMovies(result);
    
    })
    */
  //}

  useEffect(() => {
    const url = searchQuery
      ? `${search}?api_key=${apiKey}&query=${searchQuery}`
      : `${popular}?api_key=${apiKey}`;
      
    axios.get(url).then((response) => {
      setMovies(response.data.results);
    }).catch((error) => {
      console.error("Error fetching movie data:", error);
    });
  }, [searchQuery]);

  return (
    <div className="App">
      
      <div className="searchBarContainer">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Updates the searchQuery state
        />
      </div>

      <h1 className="pageTitle">Watchlist</h1>

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
