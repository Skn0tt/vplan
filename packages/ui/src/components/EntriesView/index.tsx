import * as React from "react";
import styles from "./styles";
import { Entry, Class } from "vplan-types";
import {
  withStyles,
  List,
  Paper,
  Typography,
  WithStyles,
  ListSubheader
} from "material-ui";
import EntryItem from "../../elements/EntryItem";
import * as _ from "lodash";
import { connect } from "react-redux";
import TitleBar from "../../elements/TitleBar";
import { AppState, addMarked, removeMarked, isMarked } from "vplan-redux";
import { Dispatch, Action } from "redux";
import {
  compareEntries,
  localiseDate,
  groupByDay,
  isFutureEntry
} from "vplan-util";

/**
 * # Helpers
 */
const sectionize = (entries: ReadonlyArray<Entry>): Entry[][] =>
  groupByDay(entries);

/**
 * # Component Types
 */
interface OwnProps {
  entries: ReadonlyArray<Entry>;
  allowMarking?: boolean;
  title?: string | JSX.Element;
  subtitle?: string;
  showGroups?: "lower" | "all";
}

interface StateProps {
  isMarked(c: Entry): boolean;
}
const mapStateToProps = (state: AppState) =>
  ({
    isMarked: e => isMarked(e)(state)
  } as StateProps);

interface DispatchProps {
  addMarked(e: Entry): void;
  removeMarked(e: Entry): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    addMarked: (e: Entry) => dispatch(addMarked(e)),
    removeMarked: (e: Entry) => dispatch(removeMarked(e))
  } as DispatchProps);

type Props = OwnProps & StateProps & DispatchProps & WithStyles;

/**
 * # Component
 */
const EntriesView: React.SFC<Props> = props => {
  const {
    entries = [],
    isMarked,
    addMarked,
    removeMarked,
    allowMarking,
    subtitle,
    title,
    classes,
    showGroups
  } = props;

  const filtered = entries.filter(isFutureEntry);

  const sections = sectionize(filtered);

  return (
    <div className={classes.container}>
      {title && <TitleBar primary={title} secondary={subtitle} />}
      <List>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <ListSubheader>
              {localiseDate(new Date(section[0].day))}
            </ListSubheader>
            {section
              .sort(compareEntries)
              .map((entry, index) => (
                <EntryItem
                  key={index}
                  entry={entry}
                  showGroup={showGroups}
                  isMarked={isMarked(entry)}
                  addMarked={() => allowMarking && addMarked(entry)}
                  removeMarked={() => allowMarking && removeMarked(entry)}
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
