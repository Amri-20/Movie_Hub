
import React from "react";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

function MovieRow({ title, movies = [], isLiked, onToggleLike, id }) {
  if (movies.length == 0) return null;
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <span className="shrink-0 text-sm text-gray-400">{movies.length} movies</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-proximity">
        {movies.map((movie) => (
          <article key={movie.id} className="group w-36 flex-none snap-start overflow-hidden rounded-xl bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 sm:w-44 md:w-48">
            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
              {movie.poster_path ? (
                <img
                  className="row-poster h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={`${IMAGE_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <div className="poster-placeholder flex h-full min-h-48 items-center justify-center p-3 text-center text-sm text-gray-400">No poster available</div>
              )}
              <button
                type="button"
                className={`row-like-button absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-xl text-white shadow-lg transition hover:bg-red-600 ${
                  isLiked(movie.id) ? "liked !bg-red-600" : ""
                }`}
                onClick={() => onToggleLike(movie)}
                aria-label={
                  isLiked(movie.id)
                    ? `Unlike ${movie.title}`
                    : `Like ${movie.title}`
                }
              >{isLiked(movie.id)?"♥" : "♡"}</button>
            </div>
            <h3 className="truncate px-3 pt-3 text-sm font-semibold text-white" title={movie.title}>{movies.title}</h3>
            <p className="px-3 pb-3 pt-2 text-sm text-gray-300">
                <span className="text-yellow-400">★</span>{" "}
                {Number(movie.vote_average||0).toFixed}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
