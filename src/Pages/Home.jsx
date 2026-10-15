import React, { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import SearchBar from "../Components/SearchBar";
import {
  getPopularMovies,
  searchMovies,
  getMovieGenres,
} from "../Services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);

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
        <h2 className="status-message">No movies found 😕</h2>
      )}

      {!loading && movies.length > 0 && (
        <>
          <div>
            <h2>Categories</h2>

            <div>
              {genres.map((genre) => (
                <button key={genre.id}>{genre.name}</button>
              ))}
            </div>
          </div>
          <MovieGrid movies={movies} />

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
