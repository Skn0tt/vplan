import * as React from "react";
import { connect, Dispatch } from "react-redux";
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
const mapStateToProps = (state: AppState) =>
  ({
    entries: getStudentEntries(state),
    info: getInfoStudent(state),
    group: getGroup(state)
  } as StateProps);

interface DispatchProps {
  refreshEntries(): void;
  refreshInfo(): void;
  setGroup(g: Group): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refreshEntries: () => dispatch(fetchEntriesStudent()),
    refreshInfo: () => dispatch(fetchInfoStudent()),
    setGroup: (g: Group) => dispatch(setGroup(g))
  } as DispatchProps);

type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{ group: Group }> &
  WithStyles;

/**
 * # Component
 */
const Home = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    class extends React.PureComponent<Props> {
      /**
       * ## Lifecycle
       */
      componentDidMount() {
        this.handleRefresh();
        setInterval(this.handleRefresh, 10 * 1000);
      }

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
              entries={showEntries}
              allowMarking
            />
            <Information title="Informationen" info={info} />
          </>
        );
      }
    }
  )
);

export default Home;
