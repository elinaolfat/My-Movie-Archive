import {useState, useEffect} from 'react';
import axios from 'axios'; // using axios for api

import './App.css';

function App() {
  const [movies, myMovies] = useState();
  const apiKey = "a8df0bc1e84c757fef12cc328a2e8411";
  const popular = "https://api.themoviedb.org/3/movie/popular"; // api endpoint
  
  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results; // holds info returned by the link
      console.log(result);
    })
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
