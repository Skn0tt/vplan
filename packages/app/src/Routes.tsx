import { createStackNavigator } from "react-navigation";

import * as util from "vplan-util";

import Home from "./routes/Home";
import Settings from "./routes/Settings";

const MainStack = createStackNavigator(
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
    initialRouteParams: {
      showInfo: false
    },
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: util.blue500
      }
    },
    cardStyle: {
      backgroundColor: util.white
    }
  }
);

export default MainStack;
