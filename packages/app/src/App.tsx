import * as React from "react";
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from "react-native";
import createStore from "vplan-redux";
import { Provider } from "react-redux";
import Routes from "./Routes";
import styles from "./styles";
import startPolling, { onNewEntriesReceived } from "./etc/poll";
import startPushing from "./etc/push";
import * as util from "vplan-util";

export const store = createStore({
  baseUrl: API_BASEURL,
  storage: AsyncStorage,
  onNewEntriesReceived
});

/**
 * # Component
 */
class App extends React.PureComponent {
  /**
   * ## Lifecylce
   */
  componentDidMount() {
    startPushing();
    startPolling();
  }

  /**
   * ## Render
   */
  render() {
    return (
      <View style={styles.root}>
        <StatusBar backgroundColor={util.blue500} barStyle="light-content" />
        <Provider store={store}>
          <Routes />
        </Provider>
      </View>
    );
  }
}

export default App;
