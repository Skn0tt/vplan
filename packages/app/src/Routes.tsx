import * as React from "react";
import { StackNavigator } from "react-navigation";

import * as util from "vplan-util";

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
        backgroundColor: util.blue500
      }
    }
  }
);

export default MainStack;
