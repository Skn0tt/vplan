import * as React from "react";
import {
  View,
  Text,
  AppState,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import { Entry } from "vplan-types";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

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
        <Icon name="ios-filing" color="white" size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default InfoModalButton;
