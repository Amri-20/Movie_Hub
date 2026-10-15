const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

export async function getPopularMovies(page=1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
}

export async function searchMovies(query,page=1){
  const response=await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if(!response.ok){
    throw new Error("Failed to search movies");
  };

  return response.json();
}

export async function getMovieGenres(){
  const response=await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  )

  if(!response.ok){
    throw new Error("Failed to fetch movie genres")
  }

  return response.json();
}


export async function getMoviesByGenre(genreId,page=1){
  const response=await fetch(
     `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  )

  if(!response.ok){
    throw new Error("Failed to fetch movie by genre");
  }

  return response.json();
}