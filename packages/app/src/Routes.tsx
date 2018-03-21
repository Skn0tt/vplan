import * as React from "react";
import { StackNavigator } from "react-navigation";

import Home from "./routes/Home";
import Settings from "./routes/Settings";

const MainStack = StackNavigator(
  {
    Home: {
      screen: Home,
      path: "/"
    },
    Settings: {
      screen: Settings,
      path: "/settings"
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2196f3"
      }
    }
  }
);

export default MainStack;
