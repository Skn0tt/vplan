import React from "react";
import {
  SectionList,
  Settings,
  Platform,
  View,
  TouchableOpacity,
  StatusBar,
  ListRenderItem,
  ListRenderItemInfo
} from "react-native";
import { connect, Dispatch } from "react-redux";

import Icon from "react-native-vector-icons/Feather";

import {
  getInfo,
  fetchEntries,
  isMarked,
  isLoading,
  getGroup,
  AppState,
  filterEntries,
  addMarked,
  removeMarked
} from "vplan-redux";

import InfoModal from "./components/InfoModal";
import KuerzelModal from "./components/KuerzelModal";

import Eintrag from "./elements/Eintrag";
import SectionHeaderIOS from "./elements/SectionHeader/index.ios";
import SectionHeaderDROID from "./elements/SectionHeader/index.android";
import { Class, Entry, Group, Short, Teacher } from "vplan-types";
import { Action } from "redux";
import {
  NavigationScreenOptionsGetter,
  NavigationProp,
  NavigationScreenProps
} from "react-navigation";

const SectionHeader =
  Platform.OS === "android" ? SectionHeaderDROID : SectionHeaderIOS;

type Section<T> = {
  title: Date;
  data: T[];
};

const renderItem = (
  item: Entry,
  marked: (c: Class) => boolean,
  addMarked: (c: Class) => void,
  removeMarked: (c: Class) => void,
  lookupKuerzel: (t: Teacher) => void
) => {
  const isMarked = !!item.class && marked(item.class);

  const onLongPress = () =>
    isMarked ? removeMarked(item.class) : addMarked(item.class);

  const props = {
    onLongPress,
    marked: isMarked,
    markable: !!item.class,
    item,
    lookupKuerzel
  };

  switch (item.type) {
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

const sortStunden = (a: Entry, b: Entry) => a.from - b.from;

const sortSections = (a: Section<Entry>, b: Section<Entry>) => {
  const dateA = a.data[0].day;
  const dateB = b.data[0].day;

  return dateA.getTime() - dateB.getTime();
};

const daysBetween = (first: Date, second: Date) => {
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
const sectionize = (data: ReadonlyArray<Entry>) => {
  const sections: Section<Entry>[] = [];

  data.forEach(item => {
    const i = sections.findIndex(
      entry => daysBetween(entry.title, item.day) === 0
    );
    if (i === -1) sections.push({ title: item.day, data: [item] });
    else sections[i].data.push(item);
  });

  sections.forEach(item => item.data.sort(sortStunden));

  return sections;
};

interface StateProps {
  entries(short: Short): ReadonlyArray<Entry>;
  isMarked(c: Class): boolean;
  isLoading: boolean;
  group: Group;
}
const mapStateToProps = (state: AppState) =>
  ({
    entries: (short: Short) => filterEntries(short)(state),
    isMarked: (c: Class) => isMarked(c)(state),
    isLoading: isLoading(state),
    group: getGroup(state)
  } as StateProps);

interface DispatchProps {
  refresh(): Action;
  addMarked(item: Class): Action;
  removeMarked(item: Class): Action;
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  ({
    refresh: () => dispatch(fetchEntries()),
    addMarked: (item: Class) => dispatch(addMarked(item)),
    removeMarked: (item: Class) => dispatch(removeMarked(item))
  } as DispatchProps);

type Props = StateProps & DispatchProps & NavigationScreenProps;

interface State {
  showInfoModal: boolean;
  showKuerzelModal: boolean;
  kuerzel: Short;
}

class Home extends React.Component<Props, State> {
  static navigationOptions: NavigationScreenOptionsGetter<
    void
  > = navigation => {
    const { state } = navigation;
    return {
      title: "vPlan",
      headerStyle: { backgroundColor: "#09ABF6" },
      headerTitleStyle: { color: "white", alignSelf: "center" },
      headerTintColor: "white",
      headerLeft: (
        <TouchableOpacity onPress={() => state.params!.openInfo()}>
          <Icon
            style={{ paddingLeft: 21 }}
            name="inbox"
            color="white"
            size={24}
          />
        </TouchableOpacity>
      ),
      headerRight: Platform.OS === "android" && (
        <TouchableOpacity onPress={() => state.params!.openSettings()}>
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

  state: State = {
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

  openKuerzel = (kuerzel: Teacher) =>
    this.setState({ showKuerzelModal: true, kuerzel });

  render() {
    const { props } = this;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#09ABF6" />
        <SectionList
          sections={sectionize(
            props.entries(
              Platform.OS === "ios" ? Settings.get("klasse") : props.group
            )
          ).sort(sortSections)}
          showsVerticalScrollIndicator={false}
          extraData={props.isMarked && props.isLoading}
          keyExtractor={(item, index) => "" + index}
          refreshing={props.isLoading}
          onRefresh={() => props.refresh()}
          renderSectionHeader={({ section }) => (
            <SectionHeader date={section.title} />
          )}
          renderItem={(info: ListRenderItemInfo<Entry>) =>
            renderItem(
              info.item,
              props.isMarked,
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
