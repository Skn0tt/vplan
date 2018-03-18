import * as React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  SectionList,
  SectionListData
} from "react-native";
import { RouteComponentProps } from "react-router";
import {
  AppState,
  getEntries,
  getStudentEntries,
  getOwnEntries,
  fetchEntriesTeacher,
  fetchEntriesStudent,
  isTeacher,
  isLoading
} from "vplan-redux";
import { Dispatch, connect } from "react-redux";
import { Action } from "redux";
import { Entry } from "vplan-types";
import _ from "lodash";
import EntryListItem from "./elements/EntryListItem";

/**
 * # Helpers
 */
const sectionize = (entries: Entry[]): SectionListData<Entry>[] =>
  _.values(_.groupBy(entries, "day")).map(v => ({
    data: v,
    key: "" + v[0].day
  }));

const hashEntry = (entry: Entry) =>
  entry.class + entry.day + entry.room + entry.from + entry.substituteTeacher;

/**
 * # Component Types
 */
interface StateProps {
  entries: Entry[];
  isTeacher: boolean;
  isLoading: boolean;
}
const mapStateToProps = (state: AppState) =>
  ({
    entries: getOwnEntries(state),
    isTeacher: isTeacher(state),
    isLoading: isLoading(state)
  } as StateProps);

interface DispatchProps {
  refreshTeacher(): void;
  refreshStudent(): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refreshTeacher: () => dispatch(fetchEntriesTeacher()),
    refreshStudent: () => dispatch(fetchEntriesStudent())
  } as DispatchProps);

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

/**
 * # Component
 */
const Home = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<Props> {
    /**
     * # Lifecycle
     */
    componentDidMount() {
      this.handleRefresh();
    }

    handleRefresh = () =>
      this.props.isTeacher
        ? this.props.refreshTeacher()
        : this.props.refreshStudent();

    /**
     * # Render
     */
    render() {
      const { entries, isLoading } = this.props;

      return (
        <View>
          <SectionList
            sections={sectionize(entries)}
            renderItem={({ item }) => <EntryListItem item={item} />}
            keyExtractor={hashEntry}
            refreshing={isLoading}
            onRefresh={this.handleRefresh}
          />
        </View>
      );
    }
  }
);

export default Home;
