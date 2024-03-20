import React, { useEffect, useRef, useState } from 'react'
import './AddMovie.css'

const AddMovie = () => {

  const titleRef = useRef();
  const openingRef = useRef();
  const dateRef = useRef();

  const [diplayForm,setDisplayForm] = useState(false);
  const[moviesData,setMoviesData] = useState(null);


  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch("https://swapi.dev/api/films/")
      const data = await response.json();
      setMoviesData(data.results);
    }
    fetchData();
  },[])

  console.log(moviesData);

  const addMovieHandler = (e) =>{

    e.preventDefault();
    if(!diplayForm){
      setDisplayForm(true);
      return;
    }
    const newObj = {
      title : titleRef.current.value,
      opening_crawl:openingRef.current.value,
      relese_date:dateRef.current.value
    }
    titleRef.current.value="";
    openingRef.current.value="";
    dateRef.current.value="";

    if(moviesData!=null){
      setMoviesData([...moviesData,newObj]);
    }

  }
  console.log(moviesData);
  return (
    <form className='form'>
      { diplayForm && <div className='form-container'>
        <label>title</label>
        <input type='text' ref={titleRef}></input>
        <label>Opening Text</label>
        <textarea rows='4' ref={openingRef}></textarea>
        <label>release Date</label>
        <input type='text' ref={dateRef}></input>
      </div>}
      <button onClick={addMovieHandler}>Add Movies</button>
    </form>
  )
}

export default AddMovie