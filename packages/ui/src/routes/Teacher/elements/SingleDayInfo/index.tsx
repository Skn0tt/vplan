import * as React from "react";
import {
  ListSubheader,
  Chip,
  withStyles,
  WithStyles,
  Divider
} from "@material-ui/core";
import { DayInfo } from "vplan-types";
import styles from "./styles";

/**
 * # Component Props
 */
interface OwnProps {
  title: string;
  info: DayInfo;
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const SingleDayInfo: React.SFC<Props> = ({ title, info, classes }) => (
  <>
    <ListSubheader>{title}</ListSubheader>
    <div className={classes.container}>
      <div className={classes.item}>
        {!!info.missingTeachers.length &&
          info.missingTeachers.map((v, i) => (
            <Chip label={v} className={classes.chip} key={i} />
          ))}
      </div>
      <Divider />
      <div className={classes.item}>
        {!!info.missingGroups.length &&
          info.missingGroups.map((v, i) => (
            <Chip label={v} className={classes.chip} key={i} />
          ))}
      </div>
      <Divider />
      <div className={classes.item}>
        {!!info.blockedRooms.length &&
          info.blockedRooms.map((v, i) => (
            <Chip label={v} className={classes.chip} key={i} />
          ))}
      </div>
    </div>
  </>
);

export default withStyles(styles)(SingleDayInfo);
