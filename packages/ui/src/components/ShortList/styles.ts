import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";
import { blue, green, red } from "material-ui/colors";

const styles = (theme: Theme): StyleRules => ({
  container: {
    padding: theme.spacing.unit
  },
  item: {
    width: "66pt"
  },
  button: {
    width: "100%",
    paddingRight: 0,
    flex: 1,
    flexDirection: "column"
  },
  short: {
    fontSize: "1.6em",
    fontWeight: theme.typography.fontWeightRegular
  },
  nmb: {
    marginTop: 0,
    fontSize: "1.2em",
    fontWeight: theme.typography.fontWeightLight
  },
  selected: {
    backgroundColor: theme.palette.grey["300"]
  }
});

export default styles;
