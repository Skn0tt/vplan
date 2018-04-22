import * as React from "react";
import { Text, Switch, View } from "react-native";
import * as util from "vplan-util";
import styles from "./styles";

/**
 * # Component Types
 */
interface OwnProps {
  isTeacher: boolean;
  onChange(isTeacher: boolean): void;
}
type Props = OwnProps;

/**
 * # Component
 */
const ModeSwitch: React.SFC<Props> = props => {
  const { isTeacher, onChange } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{isTeacher ? "Lehrer" : "Schüler"}</Text>
      <Switch
        style={styles.switch}
        value={isTeacher}
        onValueChange={onChange}
        onTintColor={util.deepOrange500}
        tintColor={util.blue500}
      />
    </View>
  );
};

export default ModeSwitch;
