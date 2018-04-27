import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  shortList: {
    maxHeight: "90vh",
    overflowY: "scroll"
  }
});

export default styles;
