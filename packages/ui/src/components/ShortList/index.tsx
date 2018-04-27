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
const compareItems = (a: ShortListItem, b: ShortListItem) => {
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
export type ShortListItem = {
  short: Short;
  nmb: number;
};
interface OwnProps {
  onChange(i: ShortListItem): void;
  items: ShortListItem[];
  selected: Short;
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const ShortList: React.SFC<Props> = props => {
  const { onChange, items, classes, selected } = props;

  const additionalItems = ["JKL", "JUB", "NMD", "DFG", "VBN"].map(v => ({
    short: v,
    nmb: 0
  }));

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      wrap="wrap"
      className={classes.container}
    >
      {items.sort(compareItems).map(item => (
        <Grid
          item
          className={
            classes.item +
            " " +
            (item.short === selected ? classes.selected : "")
          }
        >
          <ButtonBase
            onClick={() => onChange(item)}
            key={item.short}
            className={classes.button}
          >
            <p className={classes.short}>{item.short}</p>
            <p className={classes.nmb}>{item.nmb}</p>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ShortList);
