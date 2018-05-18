import * as React from "react";
import {
  AppState,
  getMessages,
  PutEntriesPayload,
  PutMessagesPayload,
  getMessagesStudent,
  getMessagesTeacher,
  putMessages,
  putEntries,
  fetchMessages
} from "vplan-redux";
import { Action, Dispatch } from "redux";
import { connect, MapStateToPropsParam } from "react-redux";
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
} from "@material-ui/core";
import { Delete as DeleteIcon, Add as AddIcon } from "material-ui-icons";
import EntriesUpdater from "./components/EntriesUpdater";
import InfoUpdater from "./components/InfoUpdater";
import styles from "./styles";

/**
 * # Component Types
 */
interface StateProps {
  studentMessages: string[];
  teacherMessages: string[];
}
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  studentMessages: getMessagesStudent(state),
  teacherMessages: getMessagesTeacher(state)
});

interface DispatchProps {
  putMessages(payload: PutMessagesPayload): Action;
  putEntries(payload: PutEntriesPayload): Action;
  fetchInfo(): Action;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  putMessages: payload => dispatch(putMessages(payload)),
  putEntries: payload => dispatch(putEntries(payload)),
  fetchInfo: () => dispatch(fetchMessages())
});

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps & WithStyles;

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
        this.props.putMessages({
          info: {
            student: infos,
            teacher: this.props.teacherMessages
          },
          secret: this.state.secret
        });

      handlePutTeacherInfo = (infos: string[]) =>
        this.props.putMessages({
          info: {
            student: this.props.studentMessages,
            teacher: infos
          },
          secret: this.state.secret
        });

      handlePutEntries = (files: File[]) =>
        this.props.putEntries({
          files,
          secret: this.state.secret
        });

      /**
       * ## Render
       */
      render() {
        const { studentMessages, teacherMessages, classes } = this.props;
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
            <Grid container className={classes.itemContainer} spacing={16}>
              <Grid item className={classes.item}>
                <EntriesUpdater onSend={this.handlePutEntries} />
              </Grid>
              <Grid item className={classes.item}>
                <InfoUpdater
                  title="Schülerinfos"
                  button="Schülerinfos aktualisieren"
                  infos={studentMessages}
                  onSend={this.handlePutStudentInfo}
                />
              </Grid>
              <Grid item className={classes.item}>
                <InfoUpdater
                  title="Lehrerinfos"
                  button="Lehrerinfos aktualisieren"
                  infos={teacherMessages}
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
