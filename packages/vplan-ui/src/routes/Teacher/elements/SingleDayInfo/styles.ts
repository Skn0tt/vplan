import { StyleRules } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { blue, green, red } from "@material-ui/core/colors";
import * as util from "vplan-util";

const styles = (theme: Theme): StyleRules => ({
  item: {
    margin: 10
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

export default styles;
