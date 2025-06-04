import { useState, useEffect } from "react";
import { fetchMovies } from "../services/tmdb";
import { useDebounce } from "./useDebounce";
import { updateSearchCount } from "../services/appwrite";

export function useMovies(searchTerm) {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const movies = await fetchMovies(debouncedSearch);
        setMovieList(movies);

        // update ke Appwrite hanya jika hasil pencarian (bukan discover)
        if (debouncedSearch && movies.length > 0) {
          await updateSearchCount(debouncedSearch, movies[0]);
        }
      } catch (err) {
        setErrorMessage("Error fetching movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [debouncedSearch]);

  return { loading, movieList, errorMessage };
}
