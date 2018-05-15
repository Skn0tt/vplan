import * as React from "react";
import styles from "./styles";
import { AnyEntry, Class } from "vplan-types";
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
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from "react-redux";
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
const sectionize = (entries: ReadonlyArray<AnyEntry>): AnyEntry[][] =>
  groupByDay(entries);

/**
 * # Component Types
 */
interface OwnProps {
  entries: ReadonlyArray<AnyEntry>;
  allowMarking?: boolean;
  title?: string | JSX.Element;
  subtitle?: string;
  showGroups?: "lower" | "all";
}

interface StateProps {
  isMarked(c: AnyEntry): boolean;
}
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  isMarked: e => isMarked(e)(state)
});

interface DispatchProps {
  addMarked(e: AnyEntry): void;
  removeMarked(e: AnyEntry): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  addMarked: e => dispatch(addMarked(e)),
  removeMarked: e => dispatch(removeMarked(e))
});

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

  const sections = sectionize(entries);

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

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EntriesView));
