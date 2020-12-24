import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HistoryItem } from "./HistoryItem/HistoryItem";
import { sideBarStyles } from "./styles";
import { HISTORY_TYPES } from "../../redux/types";
import { LinearProgress } from "@material-ui/core";
import { getHistoryData } from "../../utils/apis";

export const Sidebar = () => {
  const classes = sideBarStyles();
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const loadData = React.useCallback(async () => {
    dispatch({
      type: HISTORY_TYPES.LOADING_HISTORY,
      payload: true,
    });
    const data = await getHistoryData();
    dispatch({
      type: HISTORY_TYPES.FETCH_HISTORY,
      payload: data,
    });
    dispatch({
      type: HISTORY_TYPES.LOADING_HISTORY,
      payload: false,
    });
  }, [dispatch]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);
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
      {history.loading && <LinearProgress color="primary" />}
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
