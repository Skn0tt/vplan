import React from "react";
import { Text } from "react-native";

import styles from "./styles";
import dateLocaliser from "./dateLocaliser";

interface Props {
  date: Date;
}

const SectionHeader: React.SFC<Props> = ({ date }) => (
  <Text style={styles.text}>{dateLocaliser(date)}</Text>
);

export default SectionHeader;
