import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";
import { blue, green, red } from "material-ui/colors";

const styles = (theme: Theme): StyleRules => ({
  paper: {
    width: "100%"
  },
  container: {
    maxHeight: "95%",
    flex: 1
  },
  shortItem: {
    height: "10%",
    padding: theme.spacing.unit * 2
  }
});

export default styles;
