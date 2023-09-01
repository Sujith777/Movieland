import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=951440f0";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClick = () => {
    searchMovies(searchTerm);
  };
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Spiderman");
  }, []);
  return (
    <div className="app">
      <h1>Movieland</h1>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for movies"
          onChange={handleChange}
        />
        <img src={SearchIcon} alt="search" onClick={handleClick} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
          ;
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
