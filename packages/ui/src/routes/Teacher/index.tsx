import * as React from "react";
import {
  getTeacherEntries,
  fetchEntries,
  AppState,
  TeacherEntriesMap,
  fetchEntriesTeacher,
  getInfo,
  fetchInfo,
  fetchDayInfo,
  getDayInfo
} from "vplan-redux";
import {
  TeacherEntry,
  TeacherEntries,
  Short,
  Info,
  AllDayInfo
} from "vplan-types";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";
import { List } from "immutable";
import { Grid, withStyles, WithStyles, Typography, Paper } from "material-ui";
import ShortList, { Item } from "./components/ShortList";
import Information from "../../components/Information";
import styles from "./styles";
import * as _ from "lodash";
import { withRouter, RouteComponentProps } from "react-router";
import Absent from "./components/Absent";
import EntriesView from "../../components/EntriesView";
import AllDayInfoView from "./components/AllDayInfo";
import { Observable } from "rxjs";
import { isFutureEntry } from "vplan-util";

/**
 * # Helpers
 */
const getItems = (entries: TeacherEntriesMap): Item[] =>
  entries
    .map((value, key) => ({
      short: key || "etc",
      nmb: !!value ? value.length : 0
    }))
    .toArray();

/**
 * # Component Types
 */
interface StateProps {
  entries: TeacherEntriesMap;
  info: Info;
  dayInfo: AllDayInfo;
}
const mapStateToProps = (state: AppState): StateProps => ({
  entries: getTeacherEntries(state),
  info: getInfo(state),
  dayInfo: getDayInfo(state)
});

interface DispatchProps {
  refreshEntries(): void;
  refreshInfo(): void;
  refreshDayInfo(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  refreshEntries: () => dispatch(fetchEntriesTeacher()),
  refreshInfo: () => dispatch(fetchInfo()),
  refreshDayInfo: () => dispatch(fetchDayInfo())
});

type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{ short: Short }> &
  WithStyles;

/**
 * # Component
 */
class Teacher extends React.Component<Props> {
  /**
   * ## Component Lifecycle
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
  handleShortChange = (short: Short) =>
    this.props.history.push(`/teacher/${short}`);
  handleRefresh = () => {
    this.props.refreshEntries();
    this.props.refreshInfo();
    this.props.refreshDayInfo();
  };

  /**
   * ## Render
   */
  render() {
    const { entries, classes, match, info, dayInfo } = this.props;
    const { short } = match.params;

    const futureEntries = entries
      .map(v => v!.filter(isFutureEntry))
      .filter(v => v!.length !== 0)
      .toMap();

    const showEntries = futureEntries.get(short === "etc" ? "" : short);

    return (
      <Grid container direction="row" justify="space-between">
        <Grid item xs={3}>
          <ShortList
            onChange={i => this.handleShortChange(i.short)}
            items={getItems(futureEntries)}
          />
        </Grid>
        <Grid item xs={3}>
          {showEntries && (
            <EntriesView entries={showEntries} title={short} showGroups="all" />
          )}
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={16}>
            <Grid item>
              <Information title="Infos Lehrer" info={info.teacher} />
            </Grid>
            <Grid item>
              <Information title="Infos Schüler" info={info.student} />
            </Grid>
            <Grid item>
              <AllDayInfoView allInfo={dayInfo} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(Teacher))
);
