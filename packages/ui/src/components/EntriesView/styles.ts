import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  container: {
    width: "100%"
  },
  titleBar: {
    textAlign: "center",
    padding: 12
  }
});

export default styles;
