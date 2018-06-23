import * as React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

/**
 * # Component Types
 */
interface OwnProps {
  text: string;
}

type Props = OwnProps;

/**
 * # Component
 */
const ListEmptyText: React.SFC<Props> = props => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ListEmptyText;
