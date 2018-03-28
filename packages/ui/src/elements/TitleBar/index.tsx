import * as React from "react";
import { WithStyles, Paper, Typography, withStyles } from "material-ui";
import styles from "./styles";

/**
 * # Component Types
 */

interface OwnProps {
  primary: string | JSX.Element;
  secondary?: string;
}
type Props = OwnProps & WithStyles;

/**
 * # Component
 */
const TitleBar: React.SFC<Props> = props => {
  const { classes, children, primary, secondary } = props;

  return (
    <Paper className={classes.titleBar}>
      {typeof primary !== "string" ? (
        primary
      ) : (
        <React.Fragment>
          <Typography variant="title" className={classes.primary}>
            {primary}
          </Typography>
          {!!secondary && (
            <Typography variant="body1" className={classes.secondary}>
              {secondary}
            </Typography>
          )}
        </React.Fragment>
      )}
    </Paper>
  );
};

export default withStyles(styles)(TitleBar);
