import React from "react";
import { View, Picker, Text } from "react-native";
import { connect } from "react-redux";

import { actions } from "../../redux/store";
import selectors from "../../redux/selectors";

import styles from "./styles";

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

const Settings = props => (
  <View style={styles.container}>
    <View style={styles.item}>
      <Text style={styles.header}>Klasse</Text>
      <Picker
        selectedValue={props.klasse}
        onValueChange={klasse => props.setKlasse(klasse)}
      >
        {items}
      </Picker>
    </View>
  </View>
);

const mapStateToProps = state => ({
  klasse: selectors.getKlasse(state)
});

const mapDispatchToProps = dispatch => ({
  setKlasse: klasse => dispatch({ type: actions.SET_KLASSE, payload: klasse })
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
