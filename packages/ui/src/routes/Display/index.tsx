import * as React from "react";
import {
  AppState,
  StudentEntriesMap,
  getStudentEntries,
  fetchEntriesStudent,
  getInfo,
  getInfoStudent,
  fetchInfoStudent
} from "vplan-redux";
import { connect, Dispatch } from "react-redux";
import { withStyles, WithStyles, Grid } from "material-ui";
import { Action } from "redux";
import styles from "./styles";
import EntriesView from "../../components/EntriesView";
import { Entries, StudentEntries, Group, Entry } from "vplan-types";
import { Map } from "immutable";
import * as _ from "lodash";
import Information from "../../components/Information";

/**
 * # Helpers
 */
const excluded = ["ABB", "GL"];
const filter = (_, key: string) => excluded.indexOf(key) === -1;
const isNumber = (i: string) => i > "0" && i <= "9";
const isMinor = (inp: string) => isNumber(inp.charAt(0));
const stage = (g: string) => (isMinor(g) ? g.charAt(0) : g);
const group = (entries: StudentEntriesMap): Map<string, Entry[]> =>
  Map<string, Entry[]>().withMutations(mutator =>
    entries
      .filter(filter)
      .forEach((value, key) =>
        mutator.update(stage(key), [], arr => [...arr, ...value])
      )
  );

const bound = (int: number, max: number) => (int > max ? max : int);
const pages = (entries: Entry[], amount: number) => _.chunk(entries, amount);
const pick = (arr: any[], int: number) => arr[int % arr.length];

/**
 * # Component Types
 */
interface StateProps {
  entries: StudentEntriesMap;
  info: string[];
}
const mapStateToProps = (state: AppState) =>
  ({
    entries: getStudentEntries(state),
    info: getInfoStudent(state)
  } as StateProps);

interface DispatchProps {
  refresh();
  refreshInfo();
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  refresh: () => dispatch(fetchEntriesStudent()),
  refreshInfo: () => dispatch(fetchInfoStudent())
});

type Props = StateProps & DispatchProps & WithStyles;

interface State {
  page: number;
}

/**
 * # Component
 */
const Display = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    class extends React.Component<Props, State> {
      /**
       * # Intialization
       */
      state: State = {
        page: 0
      };

      /**
       * ## Component Lifecycle
       */
      componentDidMount() {
        this.props.refresh();
        this.props.refreshInfo();

        setInterval(() => this.setState({ page: this.state.page + 1 }), 5000);
        setInterval(() => this.props.refresh(), 10000);
        setInterval(() => this.props.refreshInfo(), 60000);
      }

      /**
       * ## Render
       */
      render() {
        const { entries, classes, info } = this.props;
        const { page } = this.state;

        const grouped = group(entries).sortBy(
          (v, k) => k,
          (a, b) => a.localeCompare(b)
        );

        return (
          <div className={classes.container}>
            <Grid container spacing={16} justify="center">
              {grouped
                .map((val, key) => (
                  <Grid item key={key}>
                    <EntriesView
                      entries={pick(pages(val, 5), page)}
                      title={key}
                      allowMarking={false}
                    />
                  </Grid>
                ))
                .toArray()}
              <Grid item>
                <Information title="Informationen" info={info} />
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  )
);

export default Display;
