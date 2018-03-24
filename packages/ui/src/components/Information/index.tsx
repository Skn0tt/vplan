import * as React from "react";
import { connect } from "react-redux";
import { getInfo, AppState } from "vplan-redux";
import { Info } from "vplan-types";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  ListSubheader
} from "material-ui";

/**
 * # Component Types
 */
interface OwnProps {
  title: string;
  info: string[];
}

type Props = OwnProps;

/**
 * # Component
 */
const Information: React.SFC<Props> = props => {
  const { info, title } = props;
  return (
    <Paper>
      <List subheader={<ListSubheader>{title}</ListSubheader>}>
        {info.map(item => (
          <ListItem key={item}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Information;