import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  container: {
    padding: 24
  },
  item: {
    height: "50%",
    width: "20%"
  }
});

export default styles;
