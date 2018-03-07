import React from "react";
import { Text } from "react-native";

import styles from "./styles";
import dateLocaliser from "./dateLocaliser";

const SectionHeader = ({ date }) => (
  <Text style={styles.text}>{dateLocaliser(date)}</Text>
);

export default SectionHeader;
