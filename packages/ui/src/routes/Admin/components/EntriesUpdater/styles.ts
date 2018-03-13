import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  sendBttn: {
    marginTop: 12
  },
  input: {
    display: "none"
  },
  container: {
    marginTop: 12
  }
});

export default styles;
