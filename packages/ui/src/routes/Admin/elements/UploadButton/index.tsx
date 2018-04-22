import * as React from "react";
import { Button, WithStyles, withStyles } from "material-ui";
import styles from "./styles";

/**
 * # Component Types
 */
interface OwnProps {
  accept: string;
  title: string;
  onChange(file: File): void;
}

type Props = OwnProps & WithStyles;

interface State {
  ref: HTMLInputElement;
}

/**
 * # Component
 */
const UploadButton: React.SFC<Props> = props => {
  const { accept, title, classes, onChange } = props;

  return (
    <div>
      <input
        accept={accept}
        className={classes.input}
        id={"raised-button-file-" + title}
        type="file"
        onChange={e => onChange(e.target.files![0])}
      />
      <label htmlFor={"raised-button-file-" + title}>
        <Button
          variant="raised"
          component="span"
          className={classes.button}
          fullWidth
        >
          {title}
        </Button>
      </label>
    </div>
  );
};

export default withStyles(styles)(UploadButton);
