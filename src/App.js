import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchMovieHandler() {
    setIsLoading(true);
    setError(null);
    fetch("https://swapi.dev/api/films/")
      .then(response => response.json())
      .then(data => {
        const transformMovies = data.results.map(movie => ({
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        }));
        setMovies(transformMovies);
        setIsLoading(false);
      })
      .catch(error => {
        setError("Something went wrong");
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      {isLoading && <div className='loading'><h2>Loading...</h2></div>}
      {error && <div className='loading'><h2>{error}</h2></div>}}
      {!isLoading && !error &&
        <section>
          <MoviesList movies={movies} />
        </section>}
    </React.Fragment>
  );
}

export default App;
