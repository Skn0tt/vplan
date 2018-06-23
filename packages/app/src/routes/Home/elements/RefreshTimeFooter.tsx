import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { localiseTime } from "vplan-util";

interface OwnProps {
  time: Date;
}

type Props = OwnProps;

const styles = StyleSheet.create({
  text: {
    alignSelf: "center"
  }
});

const RefreshTimeFooter: React.SFC<Props> = props => {
  const { time } = props;

  return <Text style={styles.text}>Stand: {localiseTime(time)}</Text>;
};

export default RefreshTimeFooter;
