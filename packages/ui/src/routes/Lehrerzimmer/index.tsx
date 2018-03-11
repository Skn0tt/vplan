import * as React from "react";
import {
  getTeacherEntries,
  fetchEntries,
  AppState,
  TeacherEntriesMap,
  fetchEntriesTeacher,
  getInfo
} from "vplan-redux";
import { TeacherEntry, TeacherEntries, Short, Informations } from "vplan-types";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";
import { List } from "immutable";
import { Grid, withStyles, WithStyles, Typography, Paper } from "material-ui";
import ShortList, { Item } from "./components/ShortList";
import DetailView from "./components/DetailView";
import Information from "./components/Information";
import styles from "./styles";
import _ = require("lodash");
import { withRouter, RouteComponentProps } from "react-router";
import Absent from "./components/Absent";

/**
 * Helpers
 */
const getItems = (entries: TeacherEntriesMap): Item[] =>
  entries
    .map((value, key) => ({
      short: key || "etc",
      nmb: value.length
    }))
    .toArray();

/**
 * Component Types
 */
interface StateProps {
  entries: TeacherEntriesMap;
  info: Informations;
}
const mapStateToProps = (state: AppState) =>
  ({
    entries: getTeacherEntries(state),
    info: getInfo(state)
  } as StateProps);

interface DispatchProps {
  refresh(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refresh: () => dispatch(fetchEntriesTeacher())
  } as DispatchProps);

type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{ short: Short }> &
  WithStyles;

/**
 * Component
 */
const Lehrerzimmer = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    withRouter(
      class extends React.Component<Props> {
        /**
         * Component Lifecycle
         */
        componentDidMount() {
          this.props.refresh();
        }

        /**
         * Handlers
         */
        handleShortChange = (short: Short) =>
          this.props.history.push(`/lehrerzimmer/${short}`);

        /**
         * Render
         */
        render() {
          const { entries, classes, match, info } = this.props;
          const { short } = match.params;

          const show = entries.get(short === "etc" ? "" : short);

          return (
            <Grid container>
              <Grid item>
                <ShortList
                  onChange={this.handleShortChange}
                  items={getItems(entries)}
                />
              </Grid>
              <Grid item className={classes.right}>
                <Grid
                  container
                  direction="column"
                  spacing={24}
                  alignItems="stretch"
                >
                  {show && (
                    <>
                      <Grid item>
                        <Typography variant="headline">{short}</Typography>
                      </Grid>
                      <Grid item>
                        <DetailView entries={show} />
                      </Grid>
                    </>
                  )}
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs={6}>
                        <Information info={info} />
                      </Grid>
                      <Grid item xs={6}>
                        <Absent now={[]} next={[]} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        }
      }
    )
  )
);

export default Lehrerzimmer;
