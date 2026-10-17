import React, { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import SearchBar from "../Components/SearchBar";
import {
  getPopularMovies,
  searchMovies,
  getMovieGenres,
} from "../Services/movieApi";
import MovieRow from "../Components/MovieRow";
import useLikedMovies from "../Hooks/useLikedMovies";
import { getMoviesByGenre } from "../Services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [genresLoading, setGenresLoading] = useState(false);

  const { isLiked, onToggleLike } = useLikedMovies();

  useEffect(() => {
    setError(null);

    const timer = setTimeout(() => {
      setLoading(true);

      const request =
        search.trim() === ""
          ? getPopularMovies(page)
          : searchMovies(search, page);

      request
        .then((data) => {
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  useEffect(() => {
    const futchGenre = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    futchGenre();
  }, []);

  useEffect(() => {
    if (genres.length === 0 || search.trim() !== "") {
      return;
    }

    let cancelled = false;

    async function fetchGenreMovies() {
      setGenresLoading(true);

      try {
        const results = await Promise.all(
          genres.map(async (genere) => {
            try {
              const data = await getMoviesByGenre(genere.id, 1);
              return [genere.id, data.results || []];
            } catch (error) {
              console.error(`Failed to fetch ${genere.name} movies:`, error);

              return [genere.id, []];
            }
          }),
        );

        if (!cancelled) {
          setGenreMovies((prev) => ({
            ...prev,
            ...Object.fromEntries(results),
          }));
        }
      } finally {
        if (!cancelled) {
          setGenresLoading(false);
        }
      }
    }

    fetchGenreMovies();

    return () => {
      cancelled = true;
    };
  }, [genres, search]);

  if (error) {
    return <h2 className="status-message error">{error}</h2>;
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>{search ? `Search results for "${search}"` : "Popular Movies"}</h1>

        <SearchBar
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      {loading && <div className="loader"></div>}

      {!loading && movies.length === 0 && (
        <h2 className="status-message">No movies found</h2>
      )}

      {!loading && movies.length > 0 && (
        <>
          {search.trim() ? (
            <MovieGrid movies={movies} />
          ) : (
            <MovieRow
              title="Popular Movies"
              movies={movies}
              isLiked={isLiked}
              onToggleLike={onToggleLike}
              id="popular-movies"
            />
          )}
          {!search.trim() && (
            <section className="mt-10 rounded-xl border border-white/10 bg-zinc-900/30 p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Explore by Genre
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Explore movies across your favorite genres.
                </p>
              </div>

              {genresLoading && Object.keys(genreMovies).length === 0 && (
                <p className="py-4 text-sm text-gray-400">
                  Loading genre movies...
                </p>
              )}

              {genres.map((genre) => (
                <MovieRow
                  key={genre.id}
                  id={`genre-${genre.id}`}
                  title={genre.name}
                  movies={genreMovies[genre.id] || []}
                  isLiked={isLiked}
                  onToggleLike={onToggleLike}
                />
              ))}
            </section>
          )}

          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              ← Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
