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
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  links: {
    width: "100%",
  },
}));
