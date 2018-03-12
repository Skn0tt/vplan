import { StyleRules } from "material-ui/styles/withStyles";
import { Theme } from "material-ui/styles/createMuiTheme";
import {
  blue,
  deepPurple,
  red,
  deepOrange,
  orange,
  lightBlue,
  cyan,
  common,
  grey
} from "material-ui/colors";

const styles = (theme: Theme): StyleRules => ({
  red900: { backgroundColor: red[900] },
  orange500: { backgroundColor: orange[500] },
  deepOrange500: { backgroundColor: deepOrange[500] },
  cyan500: { backgroundColor: cyan[500] },
  lightBlue500: { backgroundColor: lightBlue[500] },
  blue900: { backgroundColor: blue[900] },
  blue500: { backgroundColor: blue[500] },
  deepPurple500: { backgroundColor: deepPurple[500] },
  markedAvatar: { backgroundColor: grey[100], color: common.black },
  marked: { backgroundColor: blue[500] }
});

export default styles;
