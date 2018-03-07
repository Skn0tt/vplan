import React from "react";
import {
  SectionList,
  Settings,
  Platform,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Feather";

import selectors from "../../redux/selectors";
import { actions } from "../../redux/store";

import InfoModal from "./components/InfoModal";
import KuerzelModal from "./components/KuerzelModal";

import Eintrag from "./elements/Eintrag";
import SectionHeader from "./elements/SectionHeader";

const renderItem = (
  { item },
  marked,
  addMarked,
  removeMarked,
  lookupKuerzel
) => {
  const isMarked = marked.includes(item.fach) && item.fach;

  const onLongPress = () =>
    isMarked ? removeMarked(item.fach) : addMarked(item.fach);

  const props = {
    onLongPress,
    marked: isMarked,
    markable: !!item.fach,
    item,
    lookupKuerzel
  };

  switch (item.art) {
    case "Klausur":
      return <Eintrag.Klausur {...props} />;
    case "EVA":
      return <Eintrag.EVA {...props} />;
    case "Vertr.":
      return <Eintrag.Vertretung {...props} />;
    case "Entfall":
      return <Eintrag.Entfall {...props} />;
    case "Raum-Vtr.":
      return <Eintrag.RaumVtr {...props} />;
    case "Betreuung":
      return <Eintrag.Betreuung {...props} />;
    default:
      return <Eintrag.Betreuung {...props} />;
  }
};

const date = item =>
  new Date(item.datum.jahr, item.datum.monat - 1, item.datum.tag);

const sortStunden = (a, b) => {
  const stundeA = a.stunden[0].hour_from || a.stunden[0].hour;
  const stundeB = b.stunden[0].hour_from || b.stunden[0].hour;

  return stundeA - stundeB;
};

const sortSections = (a, b) => {
  const dateA = date(a.data[0]);
  const dateB = date(b.data[0]);

  return dateA.getTime() - dateB.getTime();
};

const daysBetween = (first, second) => {
  const one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
  const two = new Date(
    second.getFullYear(),
    second.getMonth(),
    second.getDate()
  );

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const millisBetween = two.getTime() - one.getTime();
  const days = millisBetween / millisecondsPerDay;

  return Math.floor(days);
};

/**
 *
 * @param {array} data
 */
const sectionize = data => {
  const sections = [];

  data.forEach(item => {
    const title = date(item);
    const i = sections.findIndex(
      entry => daysBetween(entry.title, title) === 0
    );
    if (i === -1) sections.push({ title, data: [item] });
    else sections[i].data.push(item);
  });

  sections.forEach(item => item.data.sort(sortStunden));

  return sections;
};

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: "vPlan",
      headerStyle: { backgroundColor: "#09ABF6" },
      headerTitleStyle: { color: "white", alignSelf: "center" },
      headerTintColor: "white",
      headerLeft: (
        <TouchableOpacity onPress={() => state.params.openInfo()}>
          <Icon
            style={{ paddingLeft: 21 }}
            name="inbox"
            color="white"
            size={24}
          />
        </TouchableOpacity>
      ),
      headerRight: Platform.OS === "android" && (
        <TouchableOpacity onPress={() => state.params.openSettings()}>
          <Icon
            style={{ paddingRight: 21 }}
            name="settings"
            color="white"
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };

  state = {
    showInfoModal: false,
    showKuerzelModal: false,
    kuerzel: ""
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openInfo: this.openInfo,
      openSettings: () => this.props.navigation.navigate("Settings")
    });
  }

  openInfo = () => this.setState({ showInfoModal: true });

  openKuerzel = kuerzel => this.setState({ showKuerzelModal: true, kuerzel });

  render() {
    const { props } = this;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#09ABF6" />
        <SectionList
          sections={sectionize(
            props.data(
              Platform.OS === "ios" ? Settings.get("klasse") : props.klasse
            )
          ).sort(sortSections)}
          showsVerticalScrollIndicator={false}
          extraData={props.marked && props.loading}
          keyExtractor={(item, index) => index}
          refreshing={props.loading}
          onRefresh={() => props.refresh()}
          renderSectionHeader={({ section }) => (
            <SectionHeader date={section.title} />
          )}
          renderItem={item =>
            renderItem(
              item,
              props.marked,
              props.addMarked,
              props.removeMarked,
              this.openKuerzel
            )
          }
        />
        {this.state.showInfoModal && (
          <InfoModal onClose={() => this.setState({ showInfoModal: false })} />
        )}
        {this.state.showKuerzelModal && (
          <KuerzelModal
            short={this.state.kuerzel}
            onClose={() => this.setState({ showKuerzelModal: false })}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: klasse => selectors.getData(klasse)(state),
  marked: selectors.getMarked(state),
  loading: selectors.getLoading(state),
  klasse: selectors.getKlasse(state)
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({ type: actions.REFRESH }),
  addMarked: item => dispatch({ type: actions.ADD_MARKED, payload: item }),
  removeMarked: item => dispatch({ type: actions.REMOVE_MARKED, payload: item })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
