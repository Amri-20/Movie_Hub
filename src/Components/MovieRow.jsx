import React from "react";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

function MovieRow({ title, movies = [], isLiked, onToggleLike, id }) {
  if (movies.length === 0) return null;

  return (
    <section id={id} className="mb-10 scroll-mt-24">
      {/* Row heading */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>

        <span className="shrink-0 text-xs text-zinc-400 sm:text-sm">
          {movies.length} movies
        </span>
      </div>

      {/* Horizontal scrolling container */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((movie) => (
          <article
            key={movie.id}
            className="group w-40 flex-none snap-start overflow-hidden rounded-xl border border-white/5 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-black/30 sm:w-44 md:w-48"
          >
            {/* Poster */}
            <div className="relative aspect-2/3 overflow-hidden bg-zinc-800">
              {movie.poster_path ? (
                <img
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={`${IMAGE_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-3 text-center text-sm text-zinc-400">
                  No poster available
                </div>
              )}

              {/* Like button */}
              <button
                type="button"
                className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-xl text-white shadow-lg backdrop-blur-md transition hover:scale-110 ${
                  isLiked(movie.id)
                    ? "bg-red-600"
                    : "bg-black/65 hover:bg-red-600"
                }`}
                onClick={() => onToggleLike(movie)}
                aria-label={
                  isLiked(movie.id)
                    ? `Unlike ${movie.title}`
                    : `Like ${movie.title}`
                }
              >
                {isLiked(movie.id) ? "♥" : "♡"}
              </button>
            </div>

            {/* Movie details */}
            <div className="p-3">
              <h3
                className="min-h-10 text-sm font-semibold leading-5 text-white line-clamp-2"
                title={movie.title}
              >
                {movie.title}
              </h3>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-zinc-300">
                <span className="text-amber-400">★</span>
                <span>
                  {Number(movie.vote_average || 0).toFixed(1)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;