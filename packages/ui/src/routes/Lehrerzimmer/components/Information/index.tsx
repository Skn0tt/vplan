import * as React from "react";
import { connect } from "react-redux";
import { getInfo, AppState } from "vplan-redux";
import { Informations } from "vplan-types";
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
  info: Informations;
}

type Props = OwnProps;

/**
 * # Component
 */
const Information: React.SFC<Props> = props => {
  const { info } = props;
  return (
    <Paper>
      <List subheader={<ListSubheader>Informationen</ListSubheader>}>
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
