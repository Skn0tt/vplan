import * as React from "react";
import { View, Text, Switch, TextInput, Picker } from "react-native";
import { connect } from "react-redux";
import {
  AppState,
  isTeacher,
  setIsTeacher,
  getIdentifier,
  setShort,
  setGroup,
  getGroup
} from "vplan-redux";
import { Dispatch, Action } from "redux";
import { Short, Group } from "vplan-types";
import ShortInput from "./elements/ShortInput";
import GroupInput from "./elements/GroupInput";
import ModeSwitch from "./elements/ModeSwitch";
import styles from "./styles";

/**
 * # Component Types
 */
interface StateProps {
  isTeacher: boolean;
  short: Short;
  group: Group;
}
const mapStateToProps = (state: AppState) =>
  ({
    isTeacher: isTeacher(state),
    short: getIdentifier(state),
    group: getGroup(state)
  } as StateProps);

interface DispatchProps {
  setIsTeacher(is: boolean): void;
  setShort(id: Short): void;
  setGroup(g: Group): void;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    setIsTeacher: (is: boolean) => dispatch(setIsTeacher(is)),
    setShort: (id: Short) => dispatch(setShort(id)),
    setGroup: (g: Group) => dispatch(setGroup(g))
  } as DispatchProps);

type Props = StateProps & DispatchProps;

/**
 * # Component
 */
const Settings = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<Props> {
    /**
     * ## Initialization
     */

    /**
     * ## Action Handlers
     */
    handleChangeIsTeacher = this.props.setIsTeacher;
    handleChangeShort = this.props.setShort;
    handleChangeGroup = this.props.setGroup;

    /**
     * ## Render
     */
    render() {
      const { isTeacher, short, group } = this.props;

      return (
        <View style={styles.container}>
          <View style={styles.item}>
            <ModeSwitch
              isTeacher={isTeacher}
              onChange={this.handleChangeIsTeacher}
            />
          </View>
          <View style={styles.item}>
            {isTeacher ? (
              <ShortInput short={short} onChange={this.handleChangeShort} />
            ) : (
              <GroupInput group={group} onChange={this.handleChangeGroup} />
            )}
          </View>
        </View>
      );
    }
  }
);

export default Settings;
