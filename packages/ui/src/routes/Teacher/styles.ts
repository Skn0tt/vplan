import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

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
