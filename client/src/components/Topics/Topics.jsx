import React from "react";
import { Topic } from "./Topic/Topic";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { topicsStyles } from "./styles";
import { TOPIC_TYPES, HISTORY_TYPES } from "../../redux/types";

export const Topics = () => {
  const topicsState = useSelector((state) => state.topics);
  const dispatch = useDispatch();
  const classes = topicsStyles();
  const [searchTerm, setSearchTerm] = React.useState(topicsState.searchValue);
  const handleChange = React.useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const getData = React.useCallback(() => {
    return (dispatch) => {
      axios.get(`http://localhost:8000/duck/${searchTerm}`).then((res) => {
        dispatch({
          type: TOPIC_TYPES.FETCH_TOPICS,
          payload: res.data,
        });
      });
    };
  }, [searchTerm]);

  const appendHistory = React.useCallback(() => {
    return (dispatch) => {
      dispatch({
        type: HISTORY_TYPES.UPDATE_HISTORY,
        payload: searchTerm,
      });
    };
  }, [searchTerm]);

  const handleSearch = React.useCallback(() => {
    if (searchTerm !== "") {
      dispatch({
        type: TOPIC_TYPES.FETCH_TOPICS,
        payload: true,
      });
      dispatch(getData());
      dispatch(appendHistory());
      dispatch({
        type: TOPIC_TYPES.FETCH_TOPICS,
        payload: false,
      });
    }
    setSearchTerm("");
  }, [appendHistory, dispatch, getData, searchTerm]);

  React.useEffect(() => {
    setSearchTerm(topicsState.searchValue);
  }, [topicsState.searchValue]);

  return (
    <>
      <Toolbar />
      <div className={classes.searchContainer}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          margin="dense"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={topicsState.loading}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <Grid container spacing={3}>
        {topicsState.topics &&
          topicsState.topics.map((topic) => {
            return (
              <Grid key={uuidv4()} item xs={3}>
                <Topic title={topic.title} url={topic.url} />
              </Grid>
            );
          })}
      </Grid>
      <div></div>
    </>
  );
};
