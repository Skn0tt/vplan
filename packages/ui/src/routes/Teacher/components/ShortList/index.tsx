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
  withStyles
} from "material-ui";
import _ = require("lodash");
import styles from "./styles";

/**
 * # Helpers
 */
const sectionize = (shorts: Item[]): Item[][] => _.chunk(shorts, 12);

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
  onChange(s: Short);
  items: Item[];
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const ShortList: React.SFC<Props> = props => {
  const { onChange, items, classes } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container>
        {sectionize(items.sort(compareItems)).map((section, index) => (
          <Grid item xs={4} key={index}>
            <List>
              {section.map(item => (
                <ListItem
                  key={item.short}
                  button
                  onClick={() => onChange(item.short)}
                >
                  <ListItemText primary={item.short} secondary={item.nmb} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(ShortList);
