import React from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";

// Routes
import Home from "./routes/Home";
import Settings from "./routes/Settings";

// Store
import createStore from "vplan-redux";

const store = createStore({
  baseUrl: ""
});

const Navigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Settings: {
      screen: Settings
    }
  },
  {
    mode: "modal",
    headerMode: "screen"
  }
);

const App: React.SFC<{}> = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
