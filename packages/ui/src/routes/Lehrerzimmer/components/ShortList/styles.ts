import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";
import { blue, green, red } from "material-ui/colors";

const styles = (theme: Theme): StyleRules => ({
  blue: { backgroundColor: blue },
  red: { backgroundColor: red },
  green: { backgroundColor: green }
});

export default styles;
