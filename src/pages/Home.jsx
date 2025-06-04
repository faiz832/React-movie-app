import { useState } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";
import { useTrendingMovies } from "../hooks/useTrendingMovies";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading: movieLoading, movieList, errorMessage } = useMovies(searchTerm);
  const { loading: trendingMoviesLoading, trendingMovies } = useTrendingMovies();

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Like
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            {trendingMoviesLoading ? (
              <div className="flex justify-center mt-12">
                <Spinner />
              </div>
            ) : (
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-[20px]">All Movies</h2>

          {movieLoading ? (
            <div className="flex justify-center mt-12">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
