import * as React from 'react';
import { Divider, ListSubheader } from 'material-ui';

/**
 * # Component Types
 */
interface OwnProps {
  title: string;
}
type Props = OwnProps;

/**
 * # Component
 */
const EntryHeader: React.SFC<Props> = (props) => {
  const { title } = props;
  return (
    <ListSubheader>
      {title}
    </ListSubheader>
  );
}

export default EntryHeader;
