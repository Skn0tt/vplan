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
import { isInFuture } from "vplan-util";

/**
 * # Helpers
 */
const join = (arr: string[]) => (arr.length === 0 ? "/" : arr.join(", "));

const split = (arr: string[]) => _.chunk(arr, 5);
const lines = (input: string[]) =>
  split(input)
    .map(arr => arr.join(", "))
    .join("\n");

const title = (date: Date) =>
  `${date.toLocaleDateString("de", { weekday: "long" })} fehlen:`;

/**
 * # Component Types
 */
interface OwnProps {
  allInfo: AllDayInfo;
}
type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const AllDayInfo: React.SFC<Props> = props => {
  const { allInfo, classes } = props;

  const futureInfo = _.filter(allInfo, (_, k) => isInFuture(new Date(k)));

  return (
    <Paper className={classes.container}>
      {_.values(futureInfo).map((info, i) => (
        <SingleDayInfo key={i} info={info} title={title(new Date(info.day))} />
      ))}
    </Paper>
  );
};

export default withStyles(styles)(AllDayInfo);
