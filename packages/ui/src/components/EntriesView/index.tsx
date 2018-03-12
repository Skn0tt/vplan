import * as React from 'react';
import styles from './styles';
import { Entry, Class } from 'vplan-types';
import { withStyles, List } from 'material-ui';
import EntryHeader from '../../elements/EntryHeader';
import EntryItem from '../../elements/EntryItem';
import _ = require('lodash');
import { connect } from 'react-redux';
import { AppState, addMarked, removeMarked, isMarked } from 'vplan-redux';
import { Dispatch, Action } from 'redux';

/**
 * # Helpers
 */
const sectionize = (entries: ReadonlyArray<Entry>): Entry[][] => {
  const groups = _.groupBy(entries, 'day');
  return _.values(groups);
};

const compareEntries = (a: Entry, b: Entry): number => {
  if (a.day !== b.day) {
    return +a.day - +b.day;
  }

  return a.from - b.from;
};

const localiseDate = (date: Date) => date.toLocaleDateString("de-DE", { weekday: 'long', day: 'numeric', month: 'long' });

/**
 * # Component Types
 */
interface OwnProps {
  entries: ReadonlyArray<Entry>;
  allowMarking?: boolean;
}

interface StateProps {
  isMarked(c: Class): boolean;
}
const mapStateToProps = (state: AppState) => ({
  isMarked: (c: Class) => isMarked(c)(state),
} as StateProps)

interface DispatchProps {
  addMarked(c: Class);
  removeMarked(c: Class);
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addMarked: (c: Class) => dispatch(addMarked(c)),
  removeMarked: (c: Class) => dispatch(removeMarked(c)),
} as DispatchProps)

type Props = OwnProps & StateProps & DispatchProps;

/**
 * # Component
 */
const EntriesView: React.SFC<Props> = (props) => {
  const { entries, isMarked, addMarked, removeMarked, allowMarking } = props;

  if (entries.length === 0) {
    //TODO: Better component
    return <p>Hurra!!</p>;
  }

  const sections = sectionize(entries);

  return (
    <List>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <EntryHeader title={localiseDate(new Date(section[0].day))} />
          {section.sort(compareEntries).map((entry, index) => (
            <EntryItem
              key={index}
              entry={entry}
              isMarked={isMarked(entry.class)}
              addMarked={allowMarking && (() => addMarked(entry.class))}
              removeMarked={allowMarking && (() => removeMarked(entry.class))}
            />
          ))}
        </React.Fragment>
      ))}
    </List>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EntriesView));
