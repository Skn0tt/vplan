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

const store = createStore({
  baseUrl: "https://vplan.simonknott.de/api",
  storage: AsyncStorage
});

const App: React.SFC<{}> = () => (
  <View style={styles.root}>
    <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
    <Provider store={store}>
      <Routes />
    </Provider>
  </View>
);

export default App;
