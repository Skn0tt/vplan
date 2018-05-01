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
    <>
      <MUIAppBar className={classes.appBar}>
        <Toolbar>
          {!!window.__env && (
            <img
              src={"/assets/" + window.__env.UI_LOGO_FILENAME}
              alt="Logo Schule"
              className={classes.logo}
            />
          )}
          <Typography variant="title" className={classes.title}>
            {
              (document.title = !!window.__env
                ? window.__env.UI_HEADER
                : "vPlan")
            }
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default withStyles(styles)(AppBar);
