import * as React from "react";
import {
  getTeacherEntries,
  fetchEntries,
  AppState,
  TeacherEntriesMap,
  fetchEntriesTeacher,
  getInfo,
  fetchInfo
} from "vplan-redux";
import { TeacherEntry, TeacherEntries, Short, Info } from "vplan-types";
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

/**
 * Helpers
 */
const getItems = (entries: TeacherEntriesMap): Item[] =>
  entries
    .map((value, key) => ({
      short: key || "etc",
      nmb: !!value ? value.length : 0
    }))
    .toArray();

/**
 * Component Types
 */
interface StateProps {
  entries: TeacherEntriesMap;
  info: Info;
}
const mapStateToProps = (state: AppState) =>
  ({
    entries: getTeacherEntries(state),
    info: getInfo(state)
  } as StateProps);

interface DispatchProps {
  refreshEntries(): void;
  refreshInfo(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refreshEntries: () => dispatch(fetchEntriesTeacher()),
    refreshInfo: () => dispatch(fetchInfo())
  } as DispatchProps);

type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{ short: Short }> &
  WithStyles;

/**
 * Component
 */
const Teacher = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    withRouter(
      class extends React.Component<Props> {
        /**
         * Component Lifecycle
         */
        componentDidMount() {
          this.props.refreshEntries();
          this.props.refreshInfo();
          setInterval(() => {
            this.props.refreshEntries();
            this.props.refreshInfo();
          }, 10 * 1000);
        }

        /**
         * Handlers
         */
        handleShortChange = (short: Short) =>
          this.props.history.push(`/teacher/${short}`);

        /**
         * Render
         */
        render() {
          const { entries, classes, match, info } = this.props;
          const { short } = match.params;

          const showEntries = entries.get(short === "etc" ? "" : short);

          return (
            <div className={classes.container}>
              <div className={classes.left}>
                <ShortList
                  onChange={this.handleShortChange}
                  items={getItems(entries)}
                />
              </div>
              <div className={classes.center}>
                {showEntries && (
                  <EntriesView entries={showEntries} title={short} />
                )}
              </div>
              <div className={classes.right}>
                <Grid container direction="column">
                  <Grid item>
                    <Information title="Infos Lehrer" info={info.teacher} />
                  </Grid>
                  <Grid item>
                    <Information title="Infos Schüler" info={info.student} />
                  </Grid>
                  <Grid item>
                    <Absent now={["BES", "GRÜTZ"]} next={[]} />
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        }
      }
    )
  )
);

export default Teacher;
