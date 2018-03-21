import * as React from "react";
import { View, Text, AppState } from "react-native";
import { Entry } from "vplan-types";
import styles from "./styles";
import _ from "lodash";

/**
 * # Helpers
 */
const getText = (from: number, to: number): string => {
  if (to !== from) {
    if (to - from === 1) {
      return `${from}/${to}`;
    }
    return `${from}-${to}`;
  }

  return "" + from;
};

const hash = (input: string): number =>
  _.sum(input.split("").map(c => c.charCodeAt(0)));
const colors = [
  "deepOrange500",
  "blue500",
  "blue900",
  "lightBlue500",
  "cyan500"
];
type Colors =
  | "deepOrange500"
  | "blue500"
  | "blue900"
  | "lightBlue500"
  | "cyan500";
const pick = (arr: any[], ind: number) => _.nth(arr, ind % arr.length);
const color = (type: string): Colors => pick(colors, hash(type));

const getStyles = (marked: boolean, item: Entry) =>
  marked ? styles.white : styles[color(item.type)];

/**
 * # Component Types
 */
interface OwnProps {
  item: Entry;
  marked: boolean;
}
type Props = OwnProps;

/**
 * # Component
 */
const Hours: React.SFC<Props> = props => {
  const { item, marked } = props;

  return (
    <View style={[styles.circle, getStyles(marked, item)]}>
      <View style={styles.container}>
        <Text style={marked ? styles.blackText : styles.whiteText}>
          {getText(item.from, item.to)}
        </Text>
      </View>
    </View>
  );
};

export default Hours;
