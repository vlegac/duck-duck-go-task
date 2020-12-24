import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { useDispatch } from "react-redux";
import { TOPIC_TYPES, HISTORY_TYPES } from "../../../redux/types";
import { getTopicsData } from "../../../utils/apis";

export const HistoryItem = ({ term }) => {
  const dispatch = useDispatch();
  const loadData = React.useCallback(async () => {
    const data = await getTopicsData(term);
    dispatch({
      type: TOPIC_TYPES.FETCH_TOPICS,
      payload: data,
    });
  }, [dispatch, term]);

  const appendHistory = React.useCallback(() => {
    return (dispatch) => {
      dispatch({
        type: HISTORY_TYPES.UPDATE_HISTORY,
        payload: term,
      });
    };
  }, [term]);

  const handleResearch = React.useCallback(() => {
    loadData();

    dispatch(appendHistory());

    dispatch({
      type: TOPIC_TYPES.HISTORY_FETCH_TOPICS,
      payload: term,
    });
  }, [appendHistory, dispatch, loadData, term]);
  return (
    <ListItem button onClick={handleResearch}>
      <ListItemText primary={term} />
    </ListItem>
  );
};
