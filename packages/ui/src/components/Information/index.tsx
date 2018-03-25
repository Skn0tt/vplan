import * as React from "react";
import { connect } from "react-redux";
import { getInfo, AppState } from "vplan-redux";
import { Info } from "vplan-types";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  ListSubheader,
  WithStyles,
  withStyles
} from "material-ui";
import styles from "./styles";

/**
 * # Component Types
 */
interface OwnProps {
  title?: string;
  info: string[];
}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const Information: React.SFC<Props> = props => {
  const { info, title, classes } = props;
  return (
    <Paper className={classes.container}>
      <List subheader={<ListSubheader>{title}</ListSubheader>}>
        {info.map(item => (
          <ListItem key={item}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default withStyles(styles)(Information);
