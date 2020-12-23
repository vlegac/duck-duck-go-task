import React from "react";
import { Topic } from "./Topic/Topic";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const Topics = () => {
  const allTopics = useSelector((state) => state.topics);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = React.useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const getData = React.useCallback(() => {
    return (dispatch) => {
      axios.get(`http://localhost:8000/duck/${searchTerm}`).then((res) => {
        dispatch({
          type: "FETCH_TOPICS",
          payload: res.data,
        });
      });
    };
  }, [searchTerm]);

  const handleSearch = React.useCallback(() => {
    if (searchTerm !== "") {
      dispatch(getData());
    }
  }, [dispatch, getData, searchTerm]);

  return (
    <div className="App">
      <h2>Search</h2>
      <div className="search-container">
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          margin="dense"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div>
        {allTopics.map((topic) => {
          return <Topic key={uuidv4()} title={topic.title} url={topic.url} />;
        })}
      </div>
    </div>
  );
};
