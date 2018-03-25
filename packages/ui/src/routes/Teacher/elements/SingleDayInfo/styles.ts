import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";
import { blue, green, red } from "material-ui/colors";
import * as util from "vplan-util";

const styles = (theme: Theme): StyleRules => ({
  container: {
    maxWidth: 400
  },
  item: {
    margin: 10
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

export default styles;
