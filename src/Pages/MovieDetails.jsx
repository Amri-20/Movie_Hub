import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../Services/movieApi";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="movie-details">
      <div className="movie-backdrop">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}
      </div>

      <div className="movie-info">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-content">
          <h1>{movie.title}</h1>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>{movie.overview}</p>
          {movie.homepage && (
            <a href={movie.homepage} target="_blank" rel="noreferrer">
              Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
