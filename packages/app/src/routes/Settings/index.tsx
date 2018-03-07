import React from "react";
import { View, Picker, Text } from "react-native";
import { connect } from "react-redux";
import { Class } from "vplan-types";

import { setClass, getClass, AppState } from "vplan-redux";

import styles from "./styles";
import { Dispatch, Action } from "redux";

const klassen = [
  "5A",
  "5B",
  "5C",
  "5D",
  "6A",
  "6B",
  "6C",
  "6D",
  "7A",
  "7B",
  "7C",
  "7D",
  "8A",
  "8B",
  "8C",
  "8D",
  "9A",
  "9B",
  "9C",
  "9D",
  "EF",
  "Q1",
  "Q2"
];

const items = klassen.map(item => (
  <Picker.Item key={item} label={item} value={item} />
));

interface StateProps {
  class: Class;
}
const mapStateToProps = (state: AppState) => ({
  class: getClass(state)
});
interface DispatchProps {
  setClass(c: Class): Action;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setClass: (c: Class) => dispatch(setClass(c))
});

type Props = StateProps & DispatchProps;

const Settings: React.SFC<Props> = props => (
  <View style={styles.container}>
    <View style={styles.item}>
      <Text style={styles.header}>Klasse</Text>
      <Picker
        selectedValue={props.class}
        onValueChange={c => props.setClass(c)}
      >
        {items}
      </Picker>
    </View>
  </View>
);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
