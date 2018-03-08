import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

interface Props {
  from: number;
  to?: number;
  marked: boolean;
}

const StundenIcon: React.SFC<Props> = ({ from, to, marked }) => (
  <View
    style={[styles.circle, marked ? styles.circlegrey : styles.circleblack]}
  >
    <Text style={[styles.text, marked ? styles.textblack : styles.textwhite]}>
      {to || to === from ? `${from}-${to}` : from}
    </Text>
  </View>
);

export default StundenIcon;
