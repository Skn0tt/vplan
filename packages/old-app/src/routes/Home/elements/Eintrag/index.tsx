import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-swipeable";

import styles from "./styles";
import StundenIcon from "../StundenIcon";
import { Short, Entry } from "vplan-types";

type Props = {
  onLongPress(): void;
  marked: boolean;
  lookupKuerzel(s: Short): void;
  teacher: string;
  title: string;
  room?: string;
  subtitle: string;
  item: Entry;
};

type SwipeableRef = { recenter(): void };

class Item extends React.Component<Props> {
  private swipeableRef?: SwipeableRef;

  kuerzelBttn = (lookup: () => void) => (
    <TouchableHighlight
      onPress={() => {
        this.swipeableRef!.recenter();
        lookup();
      }}
    >
      <View style={styles.swipebuttoncontainer}>
        <Text
          style={[styles.swipebuttontext, styles.green]}
          adjustsFontSizeToFit
        >
          Kuerzel
        </Text>
      </View>
    </TouchableHighlight>
  );

  markBttn = (onPress: () => void, marked: boolean) => (
    <TouchableHighlight
      onPress={() => {
        this.swipeableRef!.recenter();
        onPress();
      }}
    >
      <View style={styles.swipebuttoncontainer}>
        <Text
          style={[styles.swipebuttontext, marked ? styles.red : styles.orange]}
          adjustsFontSizeToFit
        >
          {marked ? "Entfernen" : "Markieren"}
        </Text>
      </View>
    </TouchableHighlight>
  );

  rightButtons = (mark: () => void, marked: boolean, lookup: () => void) => [
    this.markBttn(mark, marked),
    this.kuerzelBttn(lookup)
  ];

  render() {
    return (
      <Swipeable
        rightButtons={this.rightButtons(
          this.props.onLongPress,
          this.props.marked,
          () => this.props.lookupKuerzel(this.props.teacher)
        )}
        onRef={(ref: SwipeableRef) => (this.swipeableRef = ref)}
      >
        <View style={[styles.container, this.props.marked && styles.marked]}>
          <View style={styles.circle}>
            <StundenIcon
              from={this.props.item.from}
              to={this.props.item.to}
              marked={this.props.marked}
            />
          </View>
          <View style={styles.main}>
            <Text style={[styles.title, this.props.marked && styles.whitetext]}>
              {this.props.title}
            </Text>
            <Text
              style={[styles.subtitle, this.props.marked && styles.whitetext]}
            >
              {this.props.subtitle}
            </Text>
          </View>
          <Text style={[styles.room, this.props.marked && styles.whitetext]}>
            {this.props.room}
          </Text>
        </View>
      </Swipeable>
    );
  }
}

const ItemConstructor = (
  item: Entry,
  marked: boolean,
  markable: boolean,
  onLongPress: () => void,
  lookupKuerzel: (s: string) => void,
  lehrer: string,
  title: string,
  subtitle: string,
  room?: string
) => (
  <Item
    item={item}
    marked={marked}
    onLongPress={onLongPress}
    lookupKuerzel={lookupKuerzel}
    teacher={lehrer}
    title={title}
    subtitle={subtitle}
    room={room}
  />
);

interface ItemProps {
  item: Entry;
  marked: boolean;
  markable: boolean;
  onLongPress(): void;
  lookupKuerzel(s: Short): void;
}

const Klausur: React.SFC<ItemProps> = ({
  item,
  marked,
  markable,
  onLongPress,
  lookupKuerzel
}) =>
  ItemConstructor(
    item,
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.teacher || item.substituteTeacher,
    item.class || " ",
    `Klausur ${item.substituteTeacher}`,
    item.room || " "
  );

const EVA: React.SFC<ItemProps> = ({
  item,
  marked,
  markable,
  onLongPress,
  lookupKuerzel
}) =>
  ItemConstructor(
    item,
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.substituteTeacher || item.teacher,
    item.class || item.teacher || " ",
    `EVA ${item.substituteTeacher ? item.teacher : " "}`
  );

const Vertretung: React.SFC<ItemProps> = ({
  item,
  marked,
  markable,
  onLongPress,
  lookupKuerzel
}) =>
  ItemConstructor(
    item,
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.substituteTeacher || item.teacher,
    item.class || " ",
    `Vertretung bei ${item.substituteTeacher}`,
    item.room || " "
  );

const Entfall: React.SFC<ItemProps> = ({
  item,
  marked,
  markable,
  onLongPress,
  lookupKuerzel
}) =>
  ItemConstructor(
    item,
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.substituteTeacher || item.teacher,
    item.class || item.teacher || " ",
    `Entfall ${item.teacher}`,
    item.room || " "
  );

const RaumVtr: React.SFC<ItemProps> = ({
  item,
  marked,
  markable,
  onLongPress,
  lookupKuerzel
}) =>
  ItemConstructor(
    item,
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.substituteTeacher || item.teacher,
    item.class || " ",
    `Raumvertretung ${item.teacher}`,
    item.room || " "
  );

const Betreuung: React.SFC<ItemProps> = ({
  item,
  marked,
  markable,
  onLongPress,
  lookupKuerzel
}) =>
  ItemConstructor(
    item,
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.substituteTeacher || item.teacher,
    item.class || " ",
    `Betreuung ${item.substituteTeacher}`,
    item.room || " "
  );

export default {
  Klausur,
  EVA,
  Vertretung,
  Entfall,
  RaumVtr,
  Betreuung
};
