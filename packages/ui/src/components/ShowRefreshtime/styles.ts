import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  refreshtime: {
    position: "fixed",
    right: 10,
    bottom: 0,
    fontFamily: "Montserrat",
    fontSize: 14
  }
});

export default styles;
