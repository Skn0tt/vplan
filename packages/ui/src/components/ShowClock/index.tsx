import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * # Component Types
 */
interface State {
  date: Date;
}

interface OwnProps {}

type Props = OwnProps & WithStyles;

/**
 * # Component
 */
class ShowClock extends React.PureComponent<Props, State> {
  state: State = { date: new Date() };
  timerId: number;

  /**
   * ## Component Lifecycle
   */
  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick = () => this.setState({ date: new Date() });

  /**
   * ## Render
   */
  render() {
    const { children, classes } = this.props;
    const { date } = this.state;

    return (
      <>
        <p className={classes.time}>{date.toLocaleTimeString()}</p>
        {children}
      </>
    );
  }
}

export default withStyles(styles)(ShowClock);
