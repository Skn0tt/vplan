import * as React from "react";
import { Button, WithStyles, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * # Helpers
 */
const toArray = (files: FileList): File[] => {
  const result: File[] = [];

  let i = 0;
  while (!!files[i]) {
    result.push(files[i]);
    i++;
  }

  return result;
};

/**
 * # Component Types
 */
interface OwnProps {
  accept: string;
  title: string;
  onChange(files: File[]): void;
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
        onChange={e => onChange(toArray(e.target.files!))}
        multiple
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
