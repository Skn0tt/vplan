import * as React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  SectionList,
  SectionListData,
  Modal,
  ListRenderItemInfo
} from "react-native";
import {
  AppState,
  getEntries,
  getStudentEntries,
  getOwnEntries,
  fetchEntriesTeacher,
  fetchEntriesStudent,
  isTeacher,
  isLoading,
  addMarked,
  removeMarked,
  isMarked,
  fetchInfoStudent,
  fetchInfo,
  getGroup,
  getShort
} from "vplan-redux";
import { Dispatch, connect, MapDispatchToPropsParam } from "react-redux";
import { Action } from "redux";
import { Entry, Class, Short } from "vplan-types";
import * as _ from "lodash";
import EntryListItem from "./elements/EntryListItem";
import ListEmptyText from "./elements/ListEmptyText";
import {
  NavigationScreenOptions,
  NavigationStackScreenOptions,
  NavigationScreenOptionsGetter,
  StackNavigatorConfig,
  NavigationActions,
  NavigationRoute,
  NavigationScreenProp,
  NavigationScreenComponent,
  NavigationScreenProps,
  NavigationParams
} from "react-navigation";
import SettingsButton from "./elements/SettingsButton";
import SectionHeader from "./elements/SectionHeader";
import InfoModalButton from "./elements/InfoModalButton";
import {
  compareEntries,
  localiseDate,
  hashEntry,
  groupByDay,
  isFutureEntry
} from "vplan-util";
import InfoModal from "./components/InfoModal";

/**
 * # Helpers
 */
const sectionize = (entries: Entry[]): SectionListData<Entry>[] =>
  groupByDay(entries).map(v => ({
    data: v
  }));

const sort = (entries: Entry[]) =>
  entries ? entries.sort(compareEntries) : entries;

/**
 * # Component Types
 */
interface StateProps {
  entries: Entry[];
  isTeacher: boolean;
  isLoading: boolean;
  short: Short;
  isMarked(item: Entry): boolean;
}
const mapStateToProps = (state: AppState) =>
  ({
    entries: getOwnEntries(state) || [],
    short: getShort(state),
    isTeacher: isTeacher(state),
    isLoading: isLoading(state),
    isMarked: e => isMarked(e)(state)
  } as StateProps);

interface DispatchProps {
  refreshTeacher(): void;
  refreshStudent(): void;
  refreshAllInfo(): void;
  refreshStudentInfo(): void;
  addMarked(item: Entry): void;
  removeMarked(item: Entry): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  refreshTeacher: () => dispatch(fetchEntriesTeacher()),
  refreshStudent: () => dispatch(fetchEntriesStudent()),
  addMarked: e => dispatch(addMarked(e)),
  removeMarked: e => dispatch(removeMarked(e)),
  refreshAllInfo: () => dispatch(fetchInfo()),
  refreshStudentInfo: () => dispatch(fetchInfoStudent())
});

interface OwnProps {}

type Props = StateProps & DispatchProps & NavigationScreenProps;

type Nav = { navigation: NavigationScreenProp<NavigationRoute> };

/**
 * # Component
 */
const Home = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<Props> {
    /**
     * # Intialization
     */
    static navigationOptions = ({ navigation }: Nav) => ({
      title: !!navigation.state.params!.short
        ? `vPlan - ${navigation.state.params!.short}`
        : "vPlan",
      headerLeft: (
        <InfoModalButton
          onPress={() => navigation.setParams({ showInfo: true })}
        />
      ),
      headerRight: (
        <SettingsButton
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: "Settings"
              })
            )
          }
        />
      )
    });

    /**
     * # Lifecycle
     */
    componentDidMount() {
      this.handleRefresh();
    }

    componentWillReceiveProps() {
      const { short: oldShort } = this.props.navigation.state.params!;
      const { short: newShort } = this.props;
      if (oldShort !== newShort) {
        this.props.navigation.setParams({ short: newShort });
      }
    }

    /**
     * # Handlers
     */
    handleRefresh = () => {
      if (this.props.isTeacher) {
        this.props.refreshTeacher();
        this.props.refreshAllInfo();
      } else {
        this.props.refreshStudent();
        this.props.refreshStudentInfo();
      }
    };
    handleShowInfoModal = () => this.setState({ showInfoModal: true });
    handleCloseInfoModal = () => this.setState({ showInfoModal: false });

    /**
     * # Render
     */
    render() {
      const {
        entries,
        isLoading,
        addMarked,
        removeMarked,
        isMarked,
        navigation: { state: { params }, setParams }
      } = this.props;
      const showInfo: boolean = (params as NavigationParams).showInfo;

      const sections = sectionize(sort(entries.filter(isFutureEntry)));

      return (
        <>
          <InfoModal
            show={showInfo}
            onClose={() => setParams({ showInfo: false })}
          />
          <SectionList
            sections={sections}
            renderItem={({ item }: ListRenderItemInfo<Entry>) => (
              <EntryListItem
                item={item}
                onLongPress={() =>
                  isMarked(item) ? removeMarked(item) : addMarked(item)
                }
                marked={isMarked(item)}
              />
            )}
            renderSectionHeader={(info: {
              section: SectionListData<Entry>;
            }) => (
              <SectionHeader
                title={localiseDate(new Date(info.section.data[0].day))}
              />
            )}
            ListEmptyComponent={<ListEmptyText text="Keine Vertetungen." />}
            keyExtractor={hashEntry}
            refreshing={isLoading}
            onRefresh={this.handleRefresh}
          />
        </>
      );
    }
  }
);

export default Home;
