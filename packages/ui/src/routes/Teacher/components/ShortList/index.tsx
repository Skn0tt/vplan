import * as React from "react";
import { Short } from "vplan-types";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemAvatar,
  Avatar,
  Paper,
  WithStyles,
  withStyles,
  GridList,
  GridListTile
} from "material-ui";
import * as _ from "lodash";
import styles from "./styles";

/**
 * # Helpers
 */
const endItems = ["---", "etc"];
const compareItems = (a: Item, b: Item) => {
  if (_.includes(endItems, a.short)) {
    return 1;
  }

  if (_.includes(endItems, b.short)) {
    return -1;
  }

  return a.short.localeCompare(b.short);
};

/**
 * # Component Typings
 */
export type Item = {
  short: Short;
  nmb: number;
};
interface OwnProps {
  onChange(s: Short): void;
  items: Item[];
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const ShortList: React.SFC<Props> = props => {
  const { onChange, items, classes } = props;

  const arr = ["AJK", "JKJ", "JJK", "JLL"]
    .concat(
      ["AJK", "JKJ", "JJK", "JLL"].map(x =>
        x
          .split("")
          .reverse()
          .join("")
      )
    )
    .map(s => ({ short: s, nmb: 1 }));

  const newItems = items.concat(arr, arr, arr, arr);

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        className={classes.container}
        direction="column"
        style={{ width: "100%" }}
      >
        {items.sort(compareItems).map(item => (
          <Grid item key={item.short}>
            <ListItem onClick={() => onChange(item.short)} button>
              <ListItemText primary={item.short} secondary={item.nmb} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(ShortList);
