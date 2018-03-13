import * as React from "react";
import { Teacher } from "vplan-types";
import {
  Paper,
  Typography,
  List,
  ListItemText,
  ListSubheader,
  ListItem
} from "material-ui";

/**
 * # Helpers
 */
const join = (arr: string[]) => (arr.length === 0 ? "/" : arr.join(", "));

/**
 * # Component Types
 */
interface OwnProps {
  now: Teacher[];
  next: Teacher[];
}
type Props = OwnProps;

/**
 * # Component
 */
const Absent: React.SFC<Props> = props => {
  const { now, next } = props;

  return (
    <Paper>
      <List subheader={<ListSubheader>Momentan Abwesend:</ListSubheader>}>
        {now.map(item => (
          <ListItem key={item} dense>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <List subheader={<ListSubheader>Nächste Woche Abwesend:</ListSubheader>}>
        {next.map(item => (
          <ListItem key={item} dense>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Absent;
