import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Provider } from "react-redux";
import Routes from "./Routes";
import styles from "./styles";
import startPolling, { onNewEntriesReceived } from "./etc/poll";
import startPushing from "./etc/push";
import * as util from "vplan-util";
import createStore, { AppState } from "vplan-redux";
import { Store } from "redux";
import { isThisSecond } from "date-fns";

interface State {
  store?: Store<AppState>;
}

export let store: Store<AppState>;

/**
 * # Component
 */
class App extends React.PureComponent<{}, State> {
  state: State = {
    store: undefined
  };

  /**
   * ## Lifecylce
   */
  async componentWillMount() {
    store = await createStore({
      baseUrl: API_BASEURL,
      storage: AsyncStorage,
      onNewEntriesReceived
    });
    this.setState({ store });
  }

  componentDidMount() {
    startPushing();
    startPolling();
  }

  /**
   * ## Render
   */
  render() {
    const { store } = this.state;
    return (
      <View style={styles.root}>
        {!!store ? (
          <>
            <StatusBar
              backgroundColor={util.blue500}
              barStyle="light-content"
            />
            <Provider store={store}>
              <Routes />
            </Provider>
          </>
        ) : (
          <ActivityIndicator size="large" color={util.blue500} />
        )}
      </View>
    );
  }
}

export default App;
