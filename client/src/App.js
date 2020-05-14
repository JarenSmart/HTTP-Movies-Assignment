import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    let xx = savedList.map((savedInList) => {
      return savedInList.title;
    });
    if (xx.includes(movie.title)) {
      alert("cant add 2 movies of the same title");
    } else {
      setSavedList([...savedList, movie]);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>
      <Route
        path="/update-movie/:id"
        render={(props) => (
          <UpdateMovieForm
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
            getMovieList={getMovieList}
          />
        )}
      />
    </>
  );
};

export default App;
