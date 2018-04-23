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
  GridListTile,
  ButtonBase
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
  onChange(i: Item): void;
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

  return (
    <Paper>
      <Grid
        container
        direction="column"
        justify="flex-start"
        wrap="wrap"
        className={classes.container}
      >
        {items.sort(compareItems).map(item => (
          <ButtonBase onClick={() => onChange(item)} key={item.short}>
            <Grid item>
              <ListItemText
                primary={item.short}
                secondary={item.nmb}
                className={classes.shortItem}
              />
            </Grid>
          </ButtonBase>
        ))}
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(ShortList);
