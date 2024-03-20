import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-e0201-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovie = [];

      for(const key in data){
        loadedMovie.push(
          {
            id:key,
            title:data[key].title,
            openingText:data[key].openingText,
            releaseDate:data[key].releaseDate,
          }
        )
      }

     
      setMovies(loadedMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-e0201-default-rtdb.firebaseio.com/movies.json' , {
      method:'POST',
      body:JSON.stringify(movie)
    })
    const data = await response.json();
    fetchMoviesHandler();
   
  }
  async function onDeleteHandler(id) {
    const response = await fetch(`https://react-http-e0201-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE'
    });
    fetchMoviesHandler();
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList onDeleteHandler={onDeleteHandler} movies={movies.map(movie => ({ ...movie, key: movie.id }))} />;
  }
  

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} fetch={fetchMoviesHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
