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
  baseUrl: "http://localhost/api",
  storage: AsyncStorage
});

const App: React.SFC<{}> = () => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Provider store={store}>
      <Routes />
    </Provider>
  </View>
);

export default App;
