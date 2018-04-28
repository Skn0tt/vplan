import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  appBar: {
    position: "fixed"
  },
  logo: {
    padding: 12,
    overflow: "hidden",
    maxHeight: "64px"
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
