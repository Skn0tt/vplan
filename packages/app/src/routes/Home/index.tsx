import * as React from "react";
import { SectionList, SectionListData, ListRenderItemInfo } from "react-native";
import {
  AppState,
  getOwnEntries,
  fetchEntriesTeacher,
  fetchEntriesStudent,
  isTeacher,
  isLoading,
  addMarked,
  removeMarked,
  isMarked,
  getShort,
  fetchMessagesStudent,
  fetchMessages,
  fetchRefreshTime,
  getRefreshtime
} from "vplan-redux";
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from "react-redux";
import { AnyEntry, Short } from "vplan-types";
import EntryListItem from "./elements/EntryListItem";
import ListEmptyText from "./elements/ListEmptyText";
import {
  NavigationActions,
  NavigationRoute,
  NavigationScreenProp,
  NavigationScreenProps,
  NavigationParams
} from "react-navigation";
import SettingsButton from "./elements/SettingsButton";
import RefreshButton from "./elements/RefreshButton";
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
import RefreshTimeFooter from "./elements/RefreshTimeFooter";

/**
 * # Helpers
 */
const sectionize = (entries: AnyEntry[]): SectionListData<AnyEntry>[] =>
  groupByDay(entries).map(v => ({
    data: v
  }));

const sort = (entries: AnyEntry[]) =>
  entries ? entries.sort(compareEntries) : entries;

/**
 * # Component Types
 */
interface StateProps {
  entries: AnyEntry[];
  isTeacher: boolean;
  isLoading: boolean;
  short: Short;
  refreshTime: Date;
  isMarked(item: AnyEntry): boolean;
}
const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  entries: getOwnEntries(state) || [],
  short: getShort(state),
  isTeacher: isTeacher(state),
  isLoading: isLoading(state),
  refreshTime: getRefreshtime(state),
  isMarked: e => isMarked(e)(state)
});

interface DispatchProps {
  refreshTeacher(): void;
  refreshStudent(): void;
  refreshAllMessages(): void;
  refreshStudentMessages(): void;
  fetchRefreshTime(): void;
  addMarked(item: AnyEntry): void;
  removeMarked(item: AnyEntry): void;
}
const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = dispatch => ({
  refreshTeacher: () => dispatch(fetchEntriesTeacher()),
  refreshStudent: () => dispatch(fetchEntriesStudent()),
  fetchRefreshTime: () => dispatch(fetchRefreshTime()),
  addMarked: e => dispatch(addMarked(e)),
  removeMarked: e => dispatch(removeMarked(e)),
  refreshAllMessages: () => dispatch(fetchMessages()),
  refreshStudentMessages: () => dispatch(fetchMessagesStudent())
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
        <>
          <RefreshButton onPress={navigation.getParam("handleRefresh")} />
          <SettingsButton
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({
                  routeName: "Settings"
                })
              )
            }
          />
        </>
      )
    });

    /**
     * # Lifecycle
     */
    componentDidMount() {
      this.handleRefresh();
      this.props.navigation.setParams({ handleRefresh: this.handleRefresh });
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
        this.props.refreshAllMessages();
      } else {
        this.props.refreshStudent();
        this.props.refreshStudentMessages();
      }
      this.props.fetchRefreshTime();
    };
    handleShowInfoModal = () => this.setState({ showInfoModal: true });
    handleCloseInfoModal = () => this.setState({ showInfoModal: false });

    /**
     * # Render
     */
    render() {
      const {
        isLoading,
        addMarked,
        removeMarked,
        isMarked,
        navigation: { state: { params }, setParams },
        refreshTime
      } = this.props;
      const showInfo: boolean = (params as NavigationParams).showInfo;

      const entries: AnyEntry[] = [
        {
          class: "5b",
          day: +new Date(),
          from: 1,
          to: 2,
          group: "5B",
          room: "kfpsd",
          substituteClass: "jkl",
          substituteTeacher: "jl",
          teacher: "A",
          type: "kl"
        }
      ];

      const sections = sectionize(sort(entries.filter(isFutureEntry)));

      return (
        <>
          <InfoModal
            show={showInfo}
            onClose={() => setParams({ showInfo: false })}
          />
          <SectionList
            sections={sections}
            renderItem={({ item }: ListRenderItemInfo<AnyEntry>) => (
              <EntryListItem
                item={item}
                onLongPress={() =>
                  isMarked(item) ? removeMarked(item) : addMarked(item)
                }
                marked={isMarked(item)}
              />
            )}
            renderSectionHeader={(info: {
              section: SectionListData<AnyEntry>;
            }) => (
              <SectionHeader
                title={localiseDate(new Date(info.section.data[0].day))}
              />
            )}
            ListFooterComponent={() => <RefreshTimeFooter time={refreshTime} />}
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
