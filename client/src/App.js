import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import "./App.css";
import { Topics } from "./components/Topics/Topics";
import { useStyles } from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            DuckDuckGo Search App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper),
        }}
        open
      >
        <Toolbar />
        <div className={classes.searchHistory}>
          <Typography variant="h6">Search History</Typography>
        </div>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}>
          <Topics />
        </div>
      </main>
    </div>
  );
};

export default App;
