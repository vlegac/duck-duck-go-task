import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HISTORY_TYPES, TOPIC_TYPES } from "../../redux/types";
import { getTopicsData } from "../../utils/apis";
import { topicsStyles } from "./styles";
import { Topic } from "./Topic/Topic";

export const Topics = () => {
  const topicsState = useSelector((state) => state.topics);
  const dispatch = useDispatch();
  const classes = topicsStyles();
  const [searchTerm, setSearchTerm] = React.useState(topicsState.searchValue);
  const handleChange = React.useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const loadData = React.useCallback(async () => {
    const data = await getTopicsData(searchTerm);
    dispatch({
      type: TOPIC_TYPES.FETCH_TOPICS,
      payload: data,
    });
  }, [dispatch, searchTerm]);

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
        type: TOPIC_TYPES.LOADING_TOPICS,
        payload: true,
      });
      loadData();
      dispatch(appendHistory());
      dispatch({
        type: TOPIC_TYPES.LOADING_TOPICS,
        payload: false,
      });
    }
    setSearchTerm("");
  }, [appendHistory, dispatch, loadData, searchTerm]);

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

        {topicsState.loading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={topicsState.loading}
            onClick={handleSearch}
          >
            Search
          </Button>
        )}
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
    </>
  );
};
