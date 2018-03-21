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
import { Group, Short, Groups } from "vplan-types";

/**
 * # Helpers
 */

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
    handleChangeIdentifier = this.props.setShort;
    handleGroupChange = this.props.setGroup;

    /**
     * ## Render
     */
    render() {
      const { isTeacher, short, group } = this.props;

      return (
        <View>
          <Text>{isTeacher ? "Lehrer" : "Schüler"}</Text>
          <Switch
            value={isTeacher}
            onValueChange={this.handleChangeIsTeacher}
            // Colour!
          />
          {isTeacher ? (
            <TextInput
              value={short}
              onChangeText={this.handleChangeIdentifier}
            />
          ) : (
            <Picker
              selectedValue={group}
              onValueChange={this.handleGroupChange}
            >
              {Groups.map(g => <Picker.Item key={g} value={g} label={g} />)}
            </Picker>
          )}
        </View>
      );
    }
  }
);

export default Settings;
