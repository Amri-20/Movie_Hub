import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(movie.likes || 0);

  const navigate = useNavigate();

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="movie-poster-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="card-info">
        <h2>{movie.title}</h2>

        <div className="movie-rating">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>

        <button
          className={`like-btn ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          {liked ? "❤️" : "♡"} {likes}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;