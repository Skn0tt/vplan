import * as React from "react";
import {
  AppState,
  getInfo,
  PutEntriesPayload,
  PutInfoPayload,
  putInfo,
  putEntries,
  fetchInfo,
  getInfoStudent,
  getInfoTeacher
} from "vplan-redux";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import {
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Button,
  WithStyles,
  withStyles
} from "material-ui";
import { Delete as DeleteIcon, Add as AddIcon } from "material-ui-icons";
import EntriesUpdater from "./components/EntriesUpdater";
import InfoUpdater from "./components/InfoUpdater";
import styles from "./styles";

/**
 * # Component Types
 */
interface StateProps {
  studentInfo: string[];
  teacherInfo: string[];
}
const mapStateToProps = (state: AppState) =>
  ({
    studentInfo: getInfoStudent(state),
    teacherInfo: getInfoTeacher(state)
  } as StateProps);

interface DispatchProps {
  putInfo(payload: PutInfoPayload);
  putEntries(payload: PutEntriesPayload);
  fetchInfo();
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    putInfo: payload => dispatch(putInfo(payload)),
    putEntries: payload => dispatch(putEntries(payload)),
    fetchInfo: payload => dispatch(fetchInfo())
  } as DispatchProps);

type Props = StateProps & DispatchProps & WithStyles;

type State = {
  secret: string;
};

/**
 * # Component
 */
const Admin = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    class extends React.PureComponent<Props, State> {
      /**
       * ## Initialization
       */
      state: State = {
        secret: ""
      };

      /**
       * ## Component Lifecycle
       */
      componentDidMount() {
        this.props.fetchInfo();
      }

      /**
       * ## Validation
       */
      secretValid = () => this.state.secret.length > 0;

      /**
       * ## Handlers
       */
      handlePutStudentInfo = (infos: string[]) =>
        this.props.putInfo({
          info: {
            student: infos,
            teacher: this.props.teacherInfo
          },
          secret: this.state.secret
        });

      handlePutTeacherInfo = (infos: string[]) =>
        this.props.putInfo({
          info: {
            student: this.props.studentInfo,
            teacher: infos
          },
          secret: this.state.secret
        });

      handlePutEntries = (
        studentToday: File,
        studentTomorrow: File,
        teacherToday: File,
        teacherTomorrow: File
      ) =>
        this.props.putEntries({
          studentToday,
          studentTomorrow,
          teacherToday,
          teacherTomorrow,
          secret: this.state.secret
        });

      /**
       * ## Render
       */
      render() {
        const { studentInfo, teacherInfo, classes } = this.props;
        return (
          <div className={classes.container}>
            <TextField
              id="password-input"
              label="Secret"
              type="password"
              fullWidth
              placeholder="Geben sie hier das Secret ein"
              autoComplete="current-password"
              margin="normal"
              onChange={e => this.setState({ secret: e.target.value })}
            />
            <Grid container className={classes.itemContainer}>
              <Grid item className={classes.item}>
                <EntriesUpdater onSend={this.handlePutEntries} />
              </Grid>
              <Grid item className={classes.item}>
                <InfoUpdater
                  title="Schülerinfos"
                  button="Schülerinfos aktualisieren"
                  infos={studentInfo}
                  onSend={this.handlePutStudentInfo}
                />
              </Grid>
              <Grid item className={classes.item}>
                <InfoUpdater
                  title="Lehrerinfos"
                  button="Lehrerinfos aktualisieren"
                  infos={teacherInfo}
                  onSend={this.handlePutTeacherInfo}
                />
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  )
);

export default Admin;
