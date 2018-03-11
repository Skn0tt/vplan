import * as React from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from "material-ui";

import styles from "./styles";

interface OwnProps {}

type Props = OwnProps & WithStyles;

const AppBar: React.SFC<Props> = props => {
  const { children, classes } = props;
  return (
    <div className={classes.root}>
      <MUIAppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" className={classes.title}>
            vPlan
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default withStyles(styles)(AppBar);
