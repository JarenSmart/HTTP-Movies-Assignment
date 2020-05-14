import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMovie = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(
        (res) => (
          console.log("res is: ", res),
          // props.getMovieList();
          push("/")
        )
      )
      .catch((err) => console.log("There is an error: ", err))
      .finally(() => window.location.reload());
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div
        className="edit-button"
        onClick={() => push(`/update-movie/${movie.id}`)}
      >
        Edit
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
