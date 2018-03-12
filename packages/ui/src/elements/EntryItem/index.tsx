import * as React from "react";
import {
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "material-ui";
import styles from "./styles";
import { Entry } from "vplan-types";
import * as Tappable from "react-tappable";
import _ = require("lodash");

/**
 * # Helper Functions
 */
const time = (entry: Readonly<Entry>): string => {
  const { from, to } = entry;
  if (to !== from) {
    if (to - from === 1) {
      return `${from}/${to}`;
    }
    return `${from}-${to}`;
  }

  return "" + from;
};

const text = (entry: Readonly<Entry>): string =>
  entry.class ? entry.class + " " + entry.teacher : entry.teacher;

const secondaryText = (entry: Readonly<Entry>): string => {
  let result: string = entry.type;
  if (entry.substituteTeacher) {
    result += ", ";
    result += entry.substituteTeacher;

    if (entry.room) {
      result += "@";
      result += entry.room;
    }
  }

  return result;
};

const hash = (input: string): number =>
  _.sum(input.split("").map(c => c.charCodeAt(0)));
const colors = [
  "deepOrange500",
  "blue500",
  "blue900",
  "lightBlue500",
  "cyan500"
];
const pick = (arr: any[], ind: number) => _.nth(arr, ind % arr.length);
const color = (type: string) => pick(colors, hash(type));

/**
 * # Component Types
 */
interface OwnProps {
  entry: Readonly<Entry>;
  isMarked: boolean;
  addMarked();
  removeMarked();
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const EntryItem: React.SFC<Props> = props => {
  const { entry, classes, isMarked, removeMarked, addMarked } = props;

  return (
    <Tappable pressDelay={200} onPress={isMarked ? removeMarked : addMarked}>
      <ListItem className={isMarked ? classes.marked : null}>
        <ListItemAvatar>
          <Avatar
            className={
              isMarked ? classes.markedAvatar : classes[color(entry.type)]
            }
          >
            {time(entry)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={text(entry)} secondary={secondaryText(entry)} />
      </ListItem>
    </Tappable>
  );
};

export default withStyles(styles)(EntryItem);
