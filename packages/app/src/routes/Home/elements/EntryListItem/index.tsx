import * as React from "react";
import { View, Text, AppState } from "react-native";
import { Entry } from "vplan-types";
import { connect, Dispatch } from "react-redux";
import { Action } from "history";

/**
 * # Component Types
 */
interface OwnProps {
  item: Entry;
}
interface StateProps {}
const mapStateToProps = (state: AppState) => ({} as StateProps);

interface DispatchProps {}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({} as DispatchProps);

type Props = OwnProps & StateProps & DispatchProps;

/**
 * # Component
 */
const EntryListItem = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<Props> {
    render() {
      const { item } = this.props;

      return (
        <View>
          <Text>{JSON.stringify(item)}</Text>
        </View>
      );
    }
  }
);

export default EntryListItem;
