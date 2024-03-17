import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const[movies,setMovies] = useState([]);
  const[isLoading,setIsLoading]=useState(false);

  function fetchMovieHandler () {
    setIsLoading(true);
    fetch("https://swapi.dev/api/films/").then(respone => {
      return respone.json();
    })
    .then(( data) => {
      const transformMovies = data.results.map(movie =>{
        return {
          id:movie.episode_id,
          title:movie.title,
          openingText:movie.opening_crawl,
          releaseDate:movie.release_date
        }
      })
      setMovies(transformMovies);
      setIsLoading(false);
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      
      </section>
      {isLoading ? (
          <div className='loading'><h2>Loading...</h2></div>
        ):
      <section>
        <MoviesList movies={movies} />
      </section>}
    </React.Fragment>
  );
}

export default App;
