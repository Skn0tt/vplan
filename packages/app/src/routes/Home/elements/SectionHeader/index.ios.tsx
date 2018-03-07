import React from "react";
import { Text } from "react-native";
import { BlurView } from "react-native-blur";

import styles from "./styles";
import dateLocaliser from "./dateLocaliser";

const SectionHeader = ({ date }) => (
  <BlurView blurType="light" blurAmount={2}>
    <Text style={styles.text}>{dateLocaliser(date)}</Text>
  </BlurView>
);

export default SectionHeader;
