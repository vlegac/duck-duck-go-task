import React from "react";
import { Topic } from "./Topic/Topic";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";

export const Topics = () => {
  const topicsState = useSelector((state) => state.topics);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = React.useState(topicsState.searchValue);
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

  const appendHistory = React.useCallback(() => {
    return (dispatch) => {
      dispatch({
        type: "UPDATE_HISTORY",
        payload: searchTerm,
      });
    };
  }, [searchTerm]);

  const handleSearch = React.useCallback(() => {
    if (searchTerm !== "") {
      dispatch(getData());
      dispatch(appendHistory());
    }
    setSearchTerm("");
  }, [appendHistory, dispatch, getData, searchTerm]);

  return (
    <>
      <Toolbar />
      <Toolbar />
      <div className="search-container">
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          margin="dense"
          value={topicsState.searchValue}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div>
        {topicsState.topics.map((topic) => {
          return <Topic key={uuidv4()} title={topic.title} url={topic.url} />;
        })}
      </div>
    </>
  );
};
