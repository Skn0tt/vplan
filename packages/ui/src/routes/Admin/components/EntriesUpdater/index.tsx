import * as React from "react";
import { Button, WithStyles, withStyles, Grid } from "@material-ui/core";
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
  files: File[];
}

/**
 * # Component
 */
const EntriesUpdater = withStyles(styles)(
  class extends React.Component<Props, State> {
    /**
     * ## Initialization
     */
    state: State = { files: [] };

    /**
     * ## Validation
     */
    isValid = () => this.state.files.length !== 0;

    /**
     * ## Event Handlers
     */
    handleSend = () => {
      this.props.onSend(this.state.files);
      this.setState({ files: [] });
    };
    handleAddFiles = (files: File[]) => this.setState({ files });

    /**
     * ## Render
     */
    render() {
      const { classes } = this.props;
      const { files } = this.state;

      return (
        <div>
          <TitleBar primary="Einträge" />
          <form>
            <Grid container className={classes.container} spacing={8}>
              <Grid item xs={12}>
                <UploadButton
                  accept="text/html"
                  onChange={this.handleAddFiles}
                  title={
                    files.length === 0
                      ? "Dateien hochladen"
                      : files.map(f => f.name).join(", ")
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
