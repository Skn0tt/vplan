import * as React from "react";
import { Button, WithStyles, withStyles, Grid } from "material-ui";
import styles from "./styles";
import UploadButton from "../../elements/UploadButton";
import TitleBar from "../../../../elements/TitleBar";

/**
 * # Helpers
 */
const fileName = (file: File) => file.name;

/**
 * # Component Types
 */
interface OwnProps {
  onSend(files: File[]): void;
}
type Props = OwnProps & WithStyles;

interface State {
  studentToday?: File;
  studentTomorrow?: File;
  teacherToday?: File;
  teacherTomorrow?: File;
}

/**
 * # Component
 */
const EntriesUpdater = withStyles(styles)(
  class extends React.Component<Props, State> {
    /**
     * ## Initialization
     */
    state: State = {
      studentToday: undefined,
      studentTomorrow: undefined,
      teacherToday: undefined,
      teacherTomorrow: undefined
    };

    /**
     * ## Validation
     */
    isValid = () =>
      !!this.state.studentToday &&
      !!this.state.studentTomorrow &&
      !!this.state.teacherToday &&
      !!this.state.teacherTomorrow;

    /**
     * ## Event Handlers
     */
    handleSend = () =>
      this.isValid() &&
      this.props.onSend([
        this.state.studentToday!,
        this.state.studentTomorrow!,
        this.state.teacherToday!,
        this.state.teacherTomorrow!
      ]);
    handleSetStudentToday = (file: File) =>
      this.setState({ studentToday: file });
    handleSetStudentTomorrow = (file: File) =>
      this.setState({ studentTomorrow: file });
    handleSetTeacherToday = (file: File) =>
      this.setState({ teacherToday: file });
    handleSetTeacherTomorrow = (file: File) => {
      this.setState({ teacherTomorrow: file });
    };

    /**
     * ## Render
     */
    render() {
      const { classes } = this.props;
      const {
        studentToday,
        studentTomorrow,
        teacherToday,
        teacherTomorrow
      } = this.state;

      return (
        <div>
          <TitleBar primary="Einträge" />
          <form>
            <Grid container className={classes.container}>
              <Grid item xs={6}>
                <UploadButton
                  accept="text/html"
                  onChange={this.handleSetStudentToday}
                  title={
                    !!studentToday ? fileName(studentToday) : "Schüler heute"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <UploadButton
                  accept="text/html"
                  onChange={this.handleSetStudentTomorrow}
                  title={
                    studentTomorrow
                      ? fileName(studentTomorrow)
                      : "Schüler morgen"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <UploadButton
                  accept="text/html"
                  onChange={this.handleSetTeacherToday}
                  title={teacherToday ? fileName(teacherToday) : "Lehrer heute"}
                />
              </Grid>
              <Grid item xs={6}>
                <UploadButton
                  accept="text/html"
                  onChange={this.handleSetTeacherTomorrow}
                  title={
                    teacherTomorrow
                      ? fileName(teacherTomorrow)
                      : "Lehrer morgen"
                  }
                />
              </Grid>
            </Grid>
          </form>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleSend}
            fullWidth
            className={classes.sendBttn}
            disabled={!this.isValid()}
          >
            Einträge Aktualisieren
          </Button>
        </div>
      );
    }
  }
);

export default EntriesUpdater;
