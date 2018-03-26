import * as React from "react";
import styles from "./styles";
import { Entry, Class } from "vplan-types";
import { withStyles, List, Paper, Typography, WithStyles } from "material-ui";
import EntryHeader from "../../elements/EntryHeader";
import EntryItem from "../../elements/EntryItem";
import * as _ from "lodash";
import { connect } from "react-redux";
import TitleBar from "../../elements/TitleBar";
import { AppState, addMarked, removeMarked, isMarked } from "vplan-redux";
import { Dispatch, Action } from "redux";
import { compareEntries, localiseDate } from "vplan-util";

/**
 * # Helpers
 */
const sectionize = (entries: ReadonlyArray<Entry>): Entry[][] => {
  const groups = _.groupBy(entries, "day");
  return _.values(groups);
};

/**
 * # Component Types
 */
interface OwnProps {
  entries: ReadonlyArray<Entry>;
  allowMarking?: boolean;
  title?: string | JSX.Element;
}

interface StateProps {
  isMarked(c: Class): boolean;
}
const mapStateToProps = (state: AppState) =>
  ({
    isMarked: (c: Class) => isMarked(c)(state)
  } as StateProps);

interface DispatchProps {
  addMarked(c: Class);
  removeMarked(c: Class);
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    addMarked: (c: Class) => dispatch(addMarked(c)),
    removeMarked: (c: Class) => dispatch(removeMarked(c))
  } as DispatchProps);

type Props = OwnProps & StateProps & DispatchProps & WithStyles;

/**
 * # Component
 */
const EntriesView: React.SFC<Props> = props => {
  const {
    entries,
    isMarked,
    addMarked,
    removeMarked,
    allowMarking,
    title,
    classes
  } = props;

  const sections = sectionize(entries);

  return (
    <div className={classes.container}>
      {title && <TitleBar>{title}</TitleBar>}
      <List>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <EntryHeader title={localiseDate(new Date(section[0].day))} />
            {section
              .sort(compareEntries)
              .map((entry, index) => (
                <EntryItem
                  key={index}
                  entry={entry}
                  isMarked={isMarked(entry.class)}
                  addMarked={() => allowMarking && addMarked(entry.class)}
                  removeMarked={() => allowMarking && removeMarked(entry.class)}
                />
              ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(EntriesView)
);
