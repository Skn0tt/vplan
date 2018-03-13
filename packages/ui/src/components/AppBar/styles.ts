import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  root: {
    width: "100%",
    zIndex: 1,
    overflowX: "hidden",
    height: "100%"
  },
  appBar: {
    position: "fixed"
  },
  content: {
    width: "100%",
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 54
    }
  },
  title: {
    color: "white"
  }
});

export default styles;
