import * as React from "react";
import { View } from "react-native";
import { Route } from "react-router";
import { NativeRouter, Switch } from "react-router-native";

import Home from "./routes/Home";
import AppBar from "./components/AppBar";
import Settings from "./routes/Settings";

const Routes = () => (
  <NativeRouter>
    <View>
      {/* AppBar */}
      <Route component={AppBar} />

      {/* Routes */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </View>
  </NativeRouter>
);

export default Routes;
