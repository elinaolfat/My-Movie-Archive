import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface Movies {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

const MovieInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie as Movies;

  const [genres, setGenres] = useState<Genre[]>([]);

  // Fetch genre names from movieGenres.json
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/genres.json'); // Update with the correct path
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  if (!movie) {
    return <p>Movie details not found.</p>;
  }

  const genreNames = movie.genre_ids?.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : null;
  }).filter(Boolean);

  return (
    <div>
      <button onClick={() => navigate('/')} className="backButton">
        back to archive
      </button>

      <div className="movieDetailContainer">
      {movie.poster_path && (
        <img
          className="moviePosterDetail"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      )}
      <div className="movieDetailInfo">
        <h1 className="movieDetailTitle">{movie.title}</h1>
        <p className="movieDetailMeta">
          {movie.release_date.split('-')[0]} • {genreNames.join(', ')}
        </p>
        <p className="movieDetailOverview">{movie.overview}</p>
      </div>
    </div>
    </div>
  );
};

export default MovieInfo;
