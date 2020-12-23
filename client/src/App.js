import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Topics } from "./components/Topics/Topics";
import { useStyles } from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
      <nav className={classes.drawer}>
        <Sidebar />
      </nav>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}>
          <Topics />
        </div>
      </main>
    </div>
  );
};

export default App;
