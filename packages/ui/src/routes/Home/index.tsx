import * as React from "react";
import {
  connect,
  Dispatch,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from "react-redux";
import { StudentEntries, Group, Groups } from "vplan-types";
import {
  getStudentEntries,
  getInfoStudent,
  AppState,
  StudentEntriesMap,
  fetchEntriesStudent,
  setGroup,
  getGroup,
  fetchInfoStudent
} from "vplan-redux";
import { Action } from "redux";
import { RouteComponentProps } from "react-router";
import { WithStyles, withStyles, TextField } from "material-ui";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import styles from "./styles";
import EntriesView from "../../components/EntriesView";
import Information from "../../components/Information";
import { Observable } from "rxjs";
import { isFutureEntry } from "vplan-util";

/**
 * Helpers
 */

/**
 * Component Types
 */
interface StateProps {
  entries: StudentEntriesMap;
  info: string[];
  group: Group;
}
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  entries: getStudentEntries(state),
  info: getInfoStudent(state),
  group: getGroup(state)
});

interface DispatchProps {
  refreshEntries(): void;
  refreshInfo(): void;
  setGroup(g: Group): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  refreshEntries: () => dispatch(fetchEntriesStudent()),
  refreshInfo: () => dispatch(fetchInfoStudent()),
  setGroup: (g: Group) => dispatch(setGroup(g))
});

interface OwnProps {}

type Props = StateProps &
  DispatchProps &
  OwnProps &
  RouteComponentProps<{ group: Group }> &
  WithStyles;

/**
 * # Component
 */
class Home extends React.PureComponent<Props> {
  /**
   * ## Lifecycle
   */
  componentDidMount() {
    this.handleRefresh();
    this.refreshClock.subscribe(this.handleRefresh);
  }

  /**
   * ## Rx
   */
  refreshClock = Observable.interval(10 * 1000);

  /**
   * ## Handlers
   */
  handleRefresh = () => {
    this.props.refreshEntries();
    this.props.refreshInfo();
  };

  handleSetGroup = (g: Group) => {
    this.props.setGroup(g);
    this.props.history.push("/" + g);
  };

  /**
   * ## Render
   */
  render() {
    const { group, setGroup, entries, classes, match, info } = this.props;

    const showGroup = match.params.group || group;

    const showEntries = entries.get(showGroup) || [];
    const filteredEntries = showEntries.filter(isFutureEntry);

    return (
      <>
        <EntriesView
          title={
            <TextField
              id="select-currency-native"
              select
              value={showGroup}
              label="Klasse"
              fullWidth
              className={classes.select}
              onChange={e => this.handleSetGroup(e.target.value as Group)}
              SelectProps={{ native: true }}
            >
              {Groups.map(group => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </TextField>
          }
          entries={filteredEntries}
          allowMarking
        />
        <Information title="Informationen" info={info} />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Home)
);
