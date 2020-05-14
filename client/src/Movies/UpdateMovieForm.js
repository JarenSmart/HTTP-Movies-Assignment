import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovieForm = (props) => {
  const history = useHistory();

  console.log(props);
  const [editMovie, setEditMovie] = useState(initialMovie);

  //SUBMITHANDLER
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${editMovie.id}`, editMovie)
      .then((res) => {
        console.log(res);

        history.push(`/`);
      })
      .catch((err) => console.log("There was an error: ", err))
      .finally(() => window.location.reload());
    alert("Your movie was updated!");
  };

  //CHANGEHANDLER
  const changeHandler = (e) => {
    e.persist();
    let tName = e.target.name;
    let tValue = e.target.value;
    if (tName === "stars") {
      tValue = tValue.split(",");
    } else if (tName === "metascore") {
      tValue = parseInt(tValue, 10);
    } else {
      setEditMovie({
        ...editMovie,
        [tName]: tValue,
      });
    }
  };

  //USEEFFECT
  useEffect(() => {
    const movieToUpdate = props.movieList.find((movie) => {
      return `${movie.id}` === props.match.params.id;
    });
    if (movieToUpdate) {
      setEditMovie(movieToUpdate);
    }
  }, [props.movieList, props.match.params.id]);
  // useEffect(() => {
  //   axios.get(`http://localhost:5000/${editMovie.id}`).then((res) => {
  //     setEditMovie(res.data);
  //   });
  // }, [props.match.params.id]);

  //FORM RENDERS ON BUTTON PUSH *EDIT BUTTON*
  return (
    <div className="update-form">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title..."
          value={editMovie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director..."
          value={editMovie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore..."
          value={editMovie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars..."
          value={editMovie.stars}
        />
        <button className="submit-edit-button">Submit Update</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
