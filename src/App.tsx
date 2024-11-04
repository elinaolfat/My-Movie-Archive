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
  const [movies, myMovies] = useState<Movies[]>([]);
  const apiKey = "a8df0bc1e84c757fef12cc328a2e8411";
  const popular = "https://api.themoviedb.org/3/movie/popular"; // api endpoint
  
  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results; // holds info returned by the link
      //console.log(result); // to see format of results

      myMovies(result);

    })
  }
  return (
    <div className="App">
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
