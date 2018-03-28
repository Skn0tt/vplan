import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";

const styles = (theme: Theme): StyleRules => ({
  container: {
    marginLeft: 24,
    marginRight: 24
  },
  itemContainer: {
    marginTop: 12
  },
  item: {
    width: "33%"
  }
});

export default styles;
