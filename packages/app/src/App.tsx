import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage
} from "react-native";
import createStore from "vplan-redux";
import { Provider } from "react-redux";
import Routes from "./Routes";
import styles from "./styles";
import startPolling from "./etc/poll";
import * as util from "vplan-util";

export const store = createStore({
  baseUrl: "https://vplan.simonknott.de/api",
  storage: AsyncStorage
});

/**
 * # Component
 */
class App extends React.PureComponent {
  /**
   * ## Lifecylce
   */
  componentDidMount() {
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
