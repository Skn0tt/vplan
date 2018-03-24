import * as React from "react";
import { Short, Group, Groups } from "vplan-types";
import { Picker, Text, View } from "react-native";
import styles from "./styles";

/**
 * # Component Types
 */
interface OwnProps {
  group: Group;
  onChange(g: Group);
}
type Props = OwnProps;

/**
 * # Component
 */
const GroupInput: React.SFC<Props> = props => {
  const { group, onChange } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Klasse</Text>
      <Picker
        style={styles.item}
        selectedValue={group}
        onValueChange={onChange}
      >
        {Groups.map(g => <Picker.Item key={g} value={g} label={g} />)}
      </Picker>
    </View>
  );
};

export default GroupInput;
