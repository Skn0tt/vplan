import { StyleRules } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  container: {
    padding: 24
  },
  item: {
    height: "50%",
    width: "20%"
  },
  information: {
    height: "50%",
    width: "40%"
  }
});

export default styles;
