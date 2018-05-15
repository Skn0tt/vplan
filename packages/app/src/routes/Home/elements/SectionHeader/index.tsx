import * as React from "react";
import { View, Text, AppState, TouchableOpacity } from "react-native";
import styles from "./styles";

/**
 * # Helpers
 */
/**
 * # Component Types
 */
interface OwnProps {
  title: string;
}
type Props = OwnProps;

/**
 * # Component
 */
const SectionHeader: React.SFC<Props> = props => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default SectionHeader;
