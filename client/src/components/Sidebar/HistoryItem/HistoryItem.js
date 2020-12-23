import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch } from "react-redux";
import axios from "axios";

export const HistoryItem = ({ term }) => {
  const dispatch = useDispatch();
  const getData = React.useCallback(() => {
    return (dispatch) => {
      axios.get(`http://localhost:8000/duck/${term}`).then((res) => {
        dispatch({
          type: "FETCH_TOPICS",
          payload: res.data,
        });
      });
    };
  }, [term]);
  const appendHistory = React.useCallback(() => {
    return (dispatch) => {
      dispatch({
        type: "UPDATE_HISTORY",
        payload: term,
      });
    };
  }, [term]);

  const handleResearch = React.useCallback(() => {
    dispatch(getData());
    dispatch(appendHistory());
    dispatch({
      type: "HISTORY_FETCH_TOPICS",
      payload: term,
    });
  }, [appendHistory, dispatch, getData, term]);
  return (
    <ListItem button onClick={handleResearch}>
      <ListItemText primary={term} />
    </ListItem>
  );
};
