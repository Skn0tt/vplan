import * as React from "react";
import {
  connect,
  MapStateToPropsParam,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, getRefreshtime, fetchRefreshTime } from "vplan-redux";
import { Observable } from "rxjs";
import { WithStyles, withStyles } from "material-ui";
import styles from "./styles";
import * as config from "../../etc/config";

/**
 * # Component Types
 */
interface StateProps {
  refreshtime: Date;
}
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  refreshtime: getRefreshtime(state)
});

interface DispatchProps {
  fetchRefreshTime(): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  fetchRefreshTime: () => dispatch(fetchRefreshTime())
});

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps & WithStyles;

/**
 * # Component
 */
class ShowRefreshtimeAndImprint extends React.PureComponent<Props> {
  refreshClock = Observable.interval(60 * 1000);

  componentDidMount() {
    this.props.fetchRefreshTime();
    this.refreshClock.subscribe(this.props.fetchRefreshTime);
  }

  render() {
    const { children, refreshtime, classes } = this.props;
    const { UI_IMPRINT_URL } = config.get();

    return (
      <>
        <p className={classes.refreshtime}>
          Stand: {refreshtime.toLocaleString()}{" "}
          <a href={UI_IMPRINT_URL}>Impressum</a>
        </p>

        {children}
      </>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShowRefreshtimeAndImprint));
