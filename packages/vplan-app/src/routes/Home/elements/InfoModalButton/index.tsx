import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import * as util from "vplan-util";

/**
 * # Component Types
 */
interface OwnProps {
  onPress(): void;
}
type Props = OwnProps;

/**
 * # Component
 */
const InfoModalButton: React.SFC<Props> = props => {
  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon name="ios-filing" color={util.white} size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default InfoModalButton;
