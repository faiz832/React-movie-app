const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export const fetchMovies = async (query = "") => {
  const endpoint = query ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
};
