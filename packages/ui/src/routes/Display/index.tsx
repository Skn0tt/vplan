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
import { Observable } from "rxjs/Rx";

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
const pick = (arr: any[], int: number) => int % arr.length;

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
  second: number;
}

/**
 * # Component
 */
const Display = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    class extends React.Component<Props, State> {
      /**
       * ## Intialization
       */
      state: State = {
        second: 0,
        page: 0
      };

      /**
       * ## Rx
       */
      pageClock = Observable.interval(1000);
      refreshClock = Observable.interval(10 * 1000);
      refreshInfoClock = Observable.interval(60 * 1000);

      /**
       * ## Component Lifecycle
       */
      componentDidMount() {
        this.props.refresh();
        this.props.refreshInfo();

        this.pageClock.subscribe(this.nextSecond);
        this.refreshClock.subscribe(this.props.refresh());
        this.refreshInfoClock.subscribe(this.props.refreshInfo());
      }

      /**
       * ## Handlers
       */
      nextSecond = () => {
        this.setState({ second: (this.state.second + 1) % 5 });

        if (this.state.second === 0) {
          this.nextPage();
        }
      };
      nextPage = () => this.setState({ page: (this.state.page + 1) % 100 });

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
                .map((val, key) => {
                  const paged = pages(val, 5);
                  const picked = pick(paged, page);

                  return (
                    <Grid item key={key} className={classes.item}>
                      <EntriesView
                        entries={paged[picked]}
                        subtitle={`${picked + 1} / ${paged.length}`}
                        title={key}
                        allowMarking={false}
                        showGroups
                      />
                    </Grid>
                  );
                })
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
