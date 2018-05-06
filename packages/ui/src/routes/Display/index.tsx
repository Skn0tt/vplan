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
import {
  Entries,
  StudentEntries,
  Group,
  Entry,
  StudentEntry
} from "vplan-types";
import { Map } from "immutable";
import * as _ from "lodash";
import Information from "../../components/Information";
import { Observable } from "rxjs/Rx";
import { compareEntries, isFutureEntry } from "vplan-util";
import ShowClock from "../../components/ShowClock";
import * as config from "../../etc/config";

/**
 * # Helpers
 */
const is = <A, B extends A>(a: A) => (b: B) => a === b;
const excluded = ["ABB", "GL"];
const excluders = [is("ABB"), is("GL"), (v: string) => v[0] === "-"];
const filter = (_: any, key: string | undefined) =>
  !excluders.some(excluder => excluder(key!));
const isNumber = (i: string) => i > "0" && i <= "9";
const isMinor = (inp: string) => isNumber(inp.charAt(0));
const stage = (g: string) => (isMinor(g) ? g.charAt(0) : g);
const group = (entries: StudentEntriesMap): Map<string, Entry[]> =>
  Map<string, Entry[]>().withMutations(mutator =>
    entries
      .filter(filter)
      .forEach((value, key) =>
        mutator.update(stage(key!), [], arr => [...arr, ...value!])
      )
  );

const bound = (int: number, max: number) => (int > max ? max : int);
const pages = (entries: any[], amount: number) => _.chunk(entries, amount);
const pick = (arr: any[], int: number) => int % arr.length;
const ensureAllGroups = (map: StudentEntriesMap): StudentEntriesMap =>
  Map<string, StudentEntry[]>(neededGroups.map(g => [g, []])).merge(map);

const { UI_DISPLAY_NEEDED_GROUPS } = config.get();

const neededGroups = UI_DISPLAY_NEEDED_GROUPS.split(",");

/**
 * # Component Types
 */
interface StateProps {
  entries: StudentEntriesMap;
  info: string[];
}
const mapStateToProps = (state: AppState): StateProps =>
  ({
    entries: getStudentEntries(state),
    info: getInfoStudent(state)
  } as StateProps);

interface DispatchProps {
  refresh(): void;
  refreshInfo(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
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
class Display extends React.Component<Props, State> {
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
    this.refreshClock.subscribe(this.props.refresh);
    this.refreshInfoClock.subscribe(this.props.refreshInfo);
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

    const grouped = group(ensureAllGroups(entries)).sortBy((v, k) => k);

    const g9 = grouped.size > 8;

    const pagedInfo = pages(info, 6);
    const pickedInfo = pick(pagedInfo, page);

    return (
      <ShowClock>
        <div className={classes.container}>
          <Grid container spacing={16} justify="center">
            {grouped
              .map((val, key) => {
                const futureValues = val!.filter(isFutureEntry);
                const sortedValues = futureValues!.sort(compareEntries);
                const paged = pages(sortedValues!, 5);
                const picked = pick(paged, page);

                return (
                  <Grid item key={key} className={classes.item}>
                    <EntriesView
                      entries={paged[picked]}
                      subtitle={`${_.isNaN(picked) ? 0 : picked + 1} / ${
                        paged.length
                      }`}
                      title={key}
                      allowMarking={false}
                      showGroups="lower"
                    />
                  </Grid>
                );
              })
              .toArray()}
            <Grid item className={g9 ? classes.item : classes.information}>
              <Information
                title="Informationen"
                info={pagedInfo[pickedInfo] || []}
              />
            </Grid>
          </Grid>
        </div>
      </ShowClock>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Display)
);
