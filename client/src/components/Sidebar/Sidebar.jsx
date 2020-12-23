import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HistoryItem } from "./HistoryItem/HistoryItem";
import { sideBarStyles } from "./styles";

export const Sidebar = () => {
  const classes = sideBarStyles();
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const getData = React.useCallback(() => {
    return (dispatch) => {
      axios.get(`http://localhost:8000/history`).then((res) => {
        dispatch({
          type: "FETCH_HISTORY",
          payload: res.data,
        });
      });
    };
  }, []);

  React.useEffect(() => {
    dispatch(getData());
  }, [dispatch, getData]);
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      implementation="css"
      open
    >
      <div className={classes.searchHistory}>
        <Typography variant="h6">Search History</Typography>
      </div>
      <Divider />
      <List>
        {history.searchedTerms &&
          history.searchedTerms.length > 0 &&
          history.searchedTerms.map((term) => (
            <HistoryItem key={uuidv4()} term={term.term} />
          ))}
      </List>
    </Drawer>
  );
};
