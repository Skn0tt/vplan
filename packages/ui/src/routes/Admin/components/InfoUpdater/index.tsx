import * as React from "react";
import {
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  WithStyles,
  withStyles,
  Typography
} from "material-ui";
import { Delete as DeleteIcon, Add as AddIcon } from "material-ui-icons";
import styles from "./styles";
import TitleBar from "../../../../elements/TitleBar";
import _ = require("lodash");

/**
 * # Component Types
 */
interface OwnProps {
  infos: string[];
  onSend(info: string[]);
  title: string;
  button: string;
}

type Props = OwnProps & WithStyles;

interface State {
  infos: string[];
  field: string;
}

/**
 * # Component
 */

const InfoUpdater = withStyles(styles)(
  class extends React.Component<Props, State> {
    /**
     * ## Initialization
     */
    state: State = {
      infos: this.props.infos,
      field: ""
    };

    /**
     * ## Validation
     */
    isFieldValid = (): boolean => this.state.field.length > 0;
    isChanged = (): boolean => _.isEqual(this.state.infos, this.props.infos);

    /**
     * ## Component Lifecycle
     */
    componentDidUpdate() {
      if (this.state.infos.length === 0 && this.props.infos.length !== 0) {
        this.setState({ infos: this.props.infos });
      }
    }

    /**
     * ## Event Handlers
     */

    handleAddInfo = () =>
      this.setState({
        infos: [...this.state.infos, this.state.field],
        field: ""
      });
    handleRemoveInfo = (i: number) =>
      this.setState({
        infos: this.state.infos.filter((v, index) => index !== i)
      });

    handleSend = () => this.props.onSend(this.state.infos);

    /**
     * ## Render
     */
    render() {
      const { button, title, classes } = this.props;
      const { infos, field } = this.state;

      return (
        <div>
          <TitleBar>{title}</TitleBar>
          <List>
            {infos.map((value, index) => (
              <ListItem key={value + index}>
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.handleRemoveInfo(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <TextField
            value={field}
            className={classes.textField}
            onChange={e => this.setState({ field: e.target.value })}
          />
          <Button
            variant="fab"
            mini
            disabled={!this.isFieldValid()}
            aria-label="add"
            onClick={this.handleAddInfo}
          >
            <AddIcon />
          </Button>
          <Button
            variant="raised"
            disabled={this.isChanged()}
            color="primary"
            onClick={() => this.handleSend()}
          >
            {button}
          </Button>
        </div>
      );
    }
  }
);

export default InfoUpdater;
