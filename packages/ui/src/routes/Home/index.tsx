import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { StudentEntries, Group, Groups } from 'vplan-types';
import { getStudentEntries, getInfoStudent, AppState, StudentEntriesMap, fetchEntriesStudent, setGroup, getGroup } from 'vplan-redux';
import { Action } from 'redux';
import { RouteComponentProps } from 'react-router';
import { WithStyles, withStyles, Grid, TextField, List, ListItem, ListItemText } from 'material-ui';
import styles from './styles';
import EntriesView from '../../components/EntriesView';

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
    group: getGroup(state),
  } as StateProps);

interface DispatchProps {
  refresh(): void;
  setGroup(g: Group): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refresh: () => dispatch(fetchEntriesStudent()),
    setGroup: (g: Group) => dispatch(setGroup(g)),
  } as DispatchProps);

type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{ group: Group }> &
  WithStyles;

/**
 * # Component
 */
const Home =
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(
class extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.refresh();
    setInterval(this.props.refresh, 10 * 1000);
  }

  handleSetGroup = (g: Group) => {
    this.props.setGroup(g);
    this.props.history.push("/" + g);
  }

  render() {
    const { group, setGroup, entries, classes, match } = this.props;
  
    const showEntries = entries.get(match.params.group || group) || [];

    return (
      <Grid container direction="column">
        <Grid item className={classes.groupSelect}>
          <TextField
            id="select-currency-native"
            select
            value={group}
            label="Klasse"
            fullWidth
            onChange={(e) => this.handleSetGroup(e.target.value as Group)}
            SelectProps={{ native: true }}
          >
            {
              Groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))
            }
          </TextField>
        </Grid>
        <Grid item>
          <EntriesView
            entries={showEntries}
            allowMarking
          />
        </Grid>
      </Grid>
    );
  }
}));

export default Home;
