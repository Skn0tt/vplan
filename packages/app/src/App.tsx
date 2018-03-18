import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import createStore from "vplan-redux";
import { Provider } from "react-redux";
import Routes from "./Routes";
import styles from "./styles";

const store = createStore({
  baseUrl: "http://whale.fritz.box/api"
});

const App: React.SFC<{}> = () => (
  <View style={styles.root}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </View>
);

export default App;
