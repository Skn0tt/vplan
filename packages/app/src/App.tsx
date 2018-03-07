import React from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";

// Routes
import Home from "./routes/Home";
import Settings from "./routes/Settings";

// Store
import store from "vplan-redux";

const Navigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Settings: {
      screen: Settings
    },
    Newsletter: {
      screen: Newsletter
    }
  },
  {
    mode: "modal",
    headerMode: "screen"
  }
);

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
