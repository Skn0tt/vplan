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
    flexBasis: "300px"
  },
  center: {
    order: 2,
    minWidth: "500px"
  },
  right: {
    order: 3
  }
});

export default styles;
