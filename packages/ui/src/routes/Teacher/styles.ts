import { StyleRules } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  shortList: {
    maxHeight: "90vh"
  },
  select: {
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  }
});

export default styles;
