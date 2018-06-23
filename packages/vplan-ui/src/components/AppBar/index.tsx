import * as React from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import * as config from "../../etc/config";

import styles from "./styles";

interface OwnProps {}

type Props = OwnProps & WithStyles;

const AppBar: React.SFC<Props> = props => {
  const { children, classes } = props;
  const { UI_HEADER, UI_LOGO_FILENAME } = config.get();

  return (
    <>
      <MUIAppBar className={classes.appBar}>
        <Toolbar>
          {UI_LOGO_FILENAME && (
            <img
              src={"/assets/" + UI_LOGO_FILENAME}
              alt="Logo Schule"
              className={classes.logo}
            />
          )}
          <Typography variant="title" className={classes.title}>
            {UI_HEADER}
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default withStyles(styles)(AppBar);
