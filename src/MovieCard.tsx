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
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />
      )}
      <p>{movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
