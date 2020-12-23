import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
export const sideBarStyles = makeStyles((theme) => ({
  searchHistory: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawer: {
    height: "100%",
  },
  drawerPaper: {
    overflow: "auto",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100%",
  },
  links: {
    width: "100%",
  },
}));
