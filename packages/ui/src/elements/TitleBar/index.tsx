import * as React from "react";
import { WithStyles, Paper, Typography, withStyles } from "material-ui";
import styles from "./styles";

/**
 * # Component Types
 */

interface OwnProps {}
type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const TitleBar: React.SFC<Props> = props => {
  const { classes, children } = props;

  return (
    <Paper className={classes.titleBar}>
      {typeof children === "string" ? (
        <Typography variant="title">{children}</Typography>
      ) : (
        children
      )}
    </Paper>
  );
};

export default withStyles(styles)(TitleBar);
