import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import "./App.css";

function App() {
  const API_BASE_URI = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const endPoint = `${API_BASE_URI}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("An error occurred while fetching movies");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessages("An error occurred while fetching movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="/hero.png" alt="Hero" />
            <h1>
              Find <span className="text-gradient">Movies </span>You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="all_movies">
            <h2>Popular Movies</h2>
            {errorMessages && <p className="text-red-500">{errorMessages}</p>}

            <div className="movies-grid">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
