import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";
import { blue, green, red } from "material-ui/colors";

const styles = (theme: Theme): StyleRules => ({
  container: {
    height: "91vh",
    flex: 1
  },
  shortItem: {
    padding: theme.spacing.unit * 2
  }
});

export default styles;
