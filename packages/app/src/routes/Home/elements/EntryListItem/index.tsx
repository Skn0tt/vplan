import * as React from "react";
import { View, Text, AppState, TouchableOpacity } from "react-native";
import { Entry } from "vplan-types";
import Hours from "../Hours";
import styles from "./styles";

/**
 * # Helpers
 */
const text = (entry: Readonly<Entry>): string =>
  entry.class ? entry.class + " " + entry.teacher : entry.teacher;

const secondaryText = (entry: Readonly<Entry>): string => {
  let result: string = entry.type;
  if (entry.substituteTeacher) {
    result += ", ";
    result += entry.substituteTeacher;

    if (entry.room) {
      result += "@";
      result += entry.room;
    }
  }

  return result;
};

/**
 * # Component Types
 */
interface OwnProps {
  item: Entry;
  onLongPress(): void;
  marked: boolean;
}
type Props = OwnProps;

/**
 * # Component
 */
const EntryListItem: React.SFC<Props> = props => {
  const { item, onLongPress, marked } = props;

  return (
    <TouchableOpacity onLongPress={onLongPress}>
      <View style={[styles.container, marked && styles.marked]}>
        <View style={styles.hours}>
          <Hours item={item} marked={marked} />
        </View>
        <View style={styles.item}>
          <Text style={[styles.title, marked && styles.whiteText]}>
            {text(item)}
          </Text>
          <Text style={[styles.subTitle, marked && styles.whiteText]}>
            {secondaryText(item)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EntryListItem;
