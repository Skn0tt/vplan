import * as React from "react";
import { View, Text, Switch, TextInput, Picker } from "react-native";
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from "react-redux";
import {
  AppState,
  isTeacher,
  setIsTeacher,
  getShort,
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
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  isTeacher: isTeacher(state),
  short: getShort(state),
  group: getGroup(state)
});

interface DispatchProps {
  setIsTeacher(is: boolean): void;
  setShort(id: Short): void;
  setGroup(g: Group): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  setIsTeacher: is => dispatch(setIsTeacher(is)),
  setShort: id => dispatch(setShort(id)),
  setGroup: g => dispatch(setGroup(g))
});

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

/**
 * # Component
 */
const Settings: React.SFC<Props> = props => {
  const { isTeacher, short, group, setIsTeacher, setGroup, setShort } = props;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ModeSwitch isTeacher={isTeacher} onChange={setIsTeacher} />
      </View>
      <View style={styles.item}>
        {isTeacher ? (
          <ShortInput short={short} onChange={setShort} />
        ) : (
          <GroupInput group={group} onChange={setGroup} />
        )}
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
