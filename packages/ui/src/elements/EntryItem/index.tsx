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
import { AnyEntry } from "vplan-types";
import Tappable from "react-tappable";
import * as _ from "lodash";
import {
  text,
  secondaryText,
  textWithClass,
  textWithLowerClass
} from "vplan-util";

/**
 * # Helper Functions
 */
const time = (entry: Readonly<AnyEntry>): string => {
  const { from, to } = entry;
  if (to !== from) {
    if (to - from === 1) {
      return `${from}/${to}`;
    }
    return `${from}-${to}`;
  }

  return "" + from;
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
  entry: Readonly<AnyEntry>;
  isMarked: boolean;
  addMarked(): void;
  removeMarked(): void;
  showGroup?: undefined | "lower" | "all";
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const EntryItem: React.SFC<Props> = props => {
  const {
    entry,
    classes,
    isMarked,
    removeMarked,
    addMarked,
    showGroup
  } = props;

  return (
    <Tappable
      pressDelay={200}
      onPress={() => (isMarked ? removeMarked() : addMarked())}
    >
      <ListItem className={isMarked ? classes.marked : undefined}>
        <ListItemAvatar>
          <Avatar
            className={
              isMarked ? classes.markedAvatar : classes[color(entry.type)]
            }
          >
            {time(entry)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            !!showGroup
              ? showGroup === "all"
                ? textWithClass(entry)
                : textWithLowerClass(entry)
              : text(entry)
          }
          secondary={secondaryText(entry)}
        />
      </ListItem>
    </Tappable>
  );
};

export default withStyles(styles)(EntryItem);
