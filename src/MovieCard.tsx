import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface MovieCardProps {
  movie: Movies;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="movieContainer" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {movie.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />
      )}
      <div className="movieInfo">
      <h1 className="movieTitle">{movie.title}</h1>
      <p className="movieYear">{new Date(movie.release_date).getFullYear().toString()}</p>
      </div>
    </div>
  );
};

export default MovieCard;
