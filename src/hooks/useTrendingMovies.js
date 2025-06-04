import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/appwrite";

export function useTrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error(`Error fetching trending movies: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  return { trendingMovies, loading };
}
