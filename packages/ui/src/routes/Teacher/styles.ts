import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  left: {
    order: 1,
    minWidth: "20%"
  },
  center: {
    order: 2,
    minWidth: "30%"
  },
  right: {
    order: 3,
    minWidth: "20%"
  }
});

export default styles;
