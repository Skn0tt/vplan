import { StyleRules } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  refreshtime: {
    position: "fixed",
    right: 20,
    bottom: 0,
    fontFamily: "Montserrat",
    fontSize: 14
  }
});

export default styles;
