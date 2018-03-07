import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const StundenIcon = ({ from, to, marked }) => (
  <View
    style={[styles.circle, marked ? styles.circlegrey : styles.circleblack]}
  >
    <Text style={[styles.text, marked ? styles.textblack : styles.textwhite]}>
      {to ? `${from}-${to}` : from}
    </Text>
  </View>
);

export default StundenIcon;
