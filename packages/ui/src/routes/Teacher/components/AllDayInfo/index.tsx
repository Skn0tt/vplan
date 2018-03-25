import * as React from "react";
import { Teacher, AllDayInfo, DayInfo } from "vplan-types";
import {
  Paper,
  Typography,
  List,
  ListItemText,
  ListSubheader,
  ListItem,
  WithStyles,
  withStyles,
  Chip
} from "material-ui";
import * as _ from "lodash";
import styles from "./styles";
import SingleDayInfo from "../../elements/SingleDayInfo";

/**
 * # Helpers
 */
const join = (arr: string[]) => (arr.length === 0 ? "/" : arr.join(", "));

const split = (arr: string[]) => _.chunk(arr, 5);
const lines = (input: string[]) =>
  split(input)
    .map(arr => arr.join(", "))
    .join("\n");

/**
 * # Component Types
 */
interface OwnProps {
  info: AllDayInfo;
}
type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const AllDayInfo: React.SFC<Props> = props => {
  const { info, classes } = props;

  return (
    <Paper className={classes.container}>
      <SingleDayInfo info={info.today} title="Heute Fehlt" />
      <SingleDayInfo info={info.tomorrow} title="Morgen Fehlt" />
    </Paper>
  );
};

export default withStyles(styles)(AllDayInfo);
