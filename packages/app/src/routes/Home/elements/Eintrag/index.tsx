import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-swipeable";

import styles from "./styles";
import StundenIcon from "../StundenIcon";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeableRef: null
    };
  }

  kuerzelBttn = lookup => (
    <TouchableHighlight
      onPress={() => {
        this.state.swipeableRef.recenter();
        lookup();
      }}
    >
      <View style={styles.swipebuttoncontainer} adjustsFontSizeToFit>
        <Text style={[styles.swipebuttontext, styles.green]}>Kuerzel</Text>
      </View>
    </TouchableHighlight>
  );

  markBttn = (onPress, marked) => (
    <TouchableHighlight
      onPress={() => {
        this.state.swipeableRef.recenter();
        onPress();
      }}
    >
      <View style={styles.swipebuttoncontainer} adjustsFontSizeToFit>
        <Text
          style={[styles.swipebuttontext, marked ? styles.red : styles.orange]}
        >
          {marked ? "Entfernen" : "Markieren"}
        </Text>
      </View>
    </TouchableHighlight>
  );

  rightButtons = (mark, marked, lookup) => [
    this.markBttn(mark, marked),
    this.kuerzelBttn(lookup)
  ];

  render = () => (
    <Swipeable
      rightButtons={this.rightButtons(
        this.props.onLongPress,
        this.props.marked,
        () => this.props.lookupKuerzel(this.props.lehrer)
      )}
      onRef={ref => this.setState({ swipeableRef: ref })}
    >
      <View style={[styles.container, this.props.marked && styles.marked]}>
        <View style={styles.circle}>
          <StundenIcon {...this.props.circle} marked={this.props.marked} />
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

const time = item => {
  const stunde = item.stunden[0];

  switch (stunde.type) {
    case "range":
      return {
        from: stunde.hour_from,
        to: stunde.hour_to
      };
    case "single":
      return {
        from: stunde.hour
      };
    default:
      return {
        from: 0,
        to: 0
      };
  }
};

const ItemConstructor = (
  circle,
  marked,
  markable,
  onLongPress,
  lookupKuerzel,
  lehrer,
  title,
  subtitle,
  room
) => (
  <Item
    circle={circle}
    marked={marked}
    markable={markable}
    onLongPress={onLongPress}
    lookupKuerzel={lookupKuerzel}
    lehrer={lehrer}
    title={title}
    subtitle={subtitle}
    room={room}
  />
);

const Klausur = ({ item, marked, markable, onLongPress, lookupKuerzel }) =>
  ItemConstructor(
    time(item),
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.vertreter || item.statt_lehrer,
    item.fach || " ",
    `Klausur ${item.vertreter}`,
    item.raum || " "
  );

const EVA = ({ item, marked, markable, onLongPress, lookupKuerzel }) =>
  ItemConstructor(
    time(item),
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.vertreter || item.statt_lehrer,
    item.fach || item.statt_lehrer || " ",
    `EVA ${item.fach ? item.statt_lehrer : " "}`
  );

const Vertretung = ({ item, marked, markable, onLongPress, lookupKuerzel }) =>
  ItemConstructor(
    time(item),
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.vertreter || item.statt_lehrer,
    item.fach || " ",
    `Vertretung bei ${item.vertreter}`,
    item.raum || " "
  );

const Entfall = ({ item, marked, markable, onLongPress, lookupKuerzel }) =>
  ItemConstructor(
    time(item),
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.vertreter || item.statt_lehrer,
    item.fach || item.statt_lehrer || " ",
    `Entfall ${item.statt_lehrer}`,
    item.raum || " "
  );

const RaumVtr = ({ item, marked, markable, onLongPress, lookupKuerzel }) =>
  ItemConstructor(
    time(item),
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.vertreter || item.statt_lehrer,
    item.fach || " ",
    `Raumvertretung ${item.statt_lehrer}`,
    item.raum || " "
  );

const Betreuung = ({ item, marked, markable, onLongPress, lookupKuerzel }) =>
  ItemConstructor(
    time(item),
    marked,
    markable,
    onLongPress,
    lookupKuerzel,
    item.vertreter || item.statt_lehrer,
    item.fach || " ",
    `Betreuung ${item.vertreter}`,
    item.raum || " "
  );

export default {
  Klausur,
  EVA,
  Vertretung,
  Entfall,
  RaumVtr,
  Betreuung
};
