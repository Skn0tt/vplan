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
  Button
} from "material-ui";
import Dropzone, { DropFilesEventHandler } from "react-dropzone";
import { Delete as DeleteIcon, Add as AddIcon } from "material-ui-icons";

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

type Props = StateProps & DispatchProps;

type State = {
  secret: string;

  studentInfo: string[];
  studentInfoField: string;

  teacherInfo: string[];
  teacherInfoField: string;

  studentToday: File;
  studentTomorrow: File;
  teacherToday: File;
  teacherTomorrow: File;
};

/**
 * # Component
 */
const Admin = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<Props, State> {
    /**
     * ## Initialization
     */
    state: State = {
      secret: "",

      studentInfo: this.props.studentInfo,
      studentInfoField: "",

      teacherInfo: this.props.teacherInfo,
      teacherInfoField: "",

      teacherTomorrow: null,
      teacherToday: null,
      studentTomorrow: null,
      studentToday: null
    };

    /**
     * ## Component Lifecycle
     */
    componentDidMount() {
      this.props.fetchInfo();
    }

    componentDidUpdate() {
      if (
        this.state.studentInfo.length === 0 &&
        this.props.studentInfo.length !== 0
      ) {
        this.setState({ studentInfo: this.props.studentInfo });
      }

      if (
        this.state.teacherInfo.length === 0 &&
        this.props.teacherInfo.length !== 0
      ) {
        this.setState({ teacherInfo: this.props.teacherInfo });
      }
      console.log(this.state);
    }

    /**
     * ## Validation
     */
    entriesValid = (): boolean =>
      !!this.state.studentToday &&
      !!this.state.studentTomorrow &&
      !!this.state.teacherToday &&
      !!this.state.teacherTomorrow;

    /**
     * ## Handlers
     */
    handlePutInfo = () =>
      this.props.putInfo({
        info: {
          student: this.state.studentInfo,
          teacher: this.state.teacherInfo
        },
        secret: this.state.secret
      });
    handlePutEntries = () =>
      this.entriesValid() && this.props.putEntries(this.state);
    handleAddStudentInfo = (newInfo: string) =>
      this.setState({
        studentInfo: [...this.state.studentInfo, newInfo],
        studentInfoField: ""
      });
    handleRemoveStudentInfo = (i: number) =>
      this.setState({
        studentInfo: this.state.studentInfo.filter((v, index) => index !== i)
      });

    onDropStudentToday: DropFilesEventHandler = files =>
      this.setState({ studentToday: files[0] });
    onDropStudentTomorrow: DropFilesEventHandler = files =>
      this.setState({ studentTomorrow: files[0] });
    onDropTeacherToday: DropFilesEventHandler = files =>
      this.setState({ teacherToday: files[0] });
    onDropTeacherTomorrow: DropFilesEventHandler = files =>
      this.setState({ teacherTomorrow: files[0] });

    /**
     * ## Render
     */
    render() {
      const {} = this.props;
      const { studentInfo, studentInfoField } = this.state;
      return (
        <Grid container>
          <Grid item>
            <Typography variant="title">Secret</Typography>
            <TextField
              id="password-input"
              label="Secret"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={e => this.setState({ secret: e.target.value })}
            />
          </Grid>
          <Grid item>
            <Typography variant="title">Schüler Heute</Typography>
            <Dropzone onDrop={this.onDropStudentToday} />
          </Grid>
          <Grid item>
            <Typography variant="title">Schüler Morgen</Typography>
            <Dropzone onDrop={this.onDropStudentTomorrow} />
          </Grid>
          <Grid item>
            <Typography variant="title">Lehrer Heute</Typography>
            <Dropzone onDrop={this.onDropTeacherToday} />
          </Grid>
          <Grid item>
            <Typography variant="title">Lehrer Morgen</Typography>
            <Dropzone onDrop={this.onDropTeacherTomorrow} />
          </Grid>
          <Grid item>
            <Button
              variant="raised"
              color="primary"
              disabled={!this.entriesValid()}
              onClick={() => this.handlePutEntries()}
            >
              vPlan aktualisieren
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="title">Informationen</Typography>
            <List>
              {studentInfo.map((value, index) => (
                <ListItem key={value + index}>
                  <ListItemText primary={value} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.handleRemoveStudentInfo(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <TextField
              value={studentInfoField}
              onChange={e =>
                this.setState({ studentInfoField: e.target.value })
              }
            />
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="add"
              onClick={() =>
                this.handleAddStudentInfo(this.state.studentInfoField)
              }
            >
              <AddIcon />
            </Button>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.handlePutInfo()}
            >
              Infos Aktualisieren
            </Button>
          </Grid>
        </Grid>
      );
    }
  }
);

export default Admin;
