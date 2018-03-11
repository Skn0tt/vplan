import * as React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as Loadable from "react-loadable";

import Loading from "./elements/Loading";
import AppBar from "./components/AppBar";

// Routes
const LoadableLehrerzimmer = Loadable({
  loader: () => import("./routes/Lehrerzimmer"),
  loading: Loading
});

const LoadablePausenhalle = Loadable({
  loader: () => import("./routes/Pausenhalle"),
  loading: Loading
});

const Routes: React.SFC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <AppBar>
        <Route exact path="/lehrerzimmer" component={LoadableLehrerzimmer} />
        <Route path="/lehrerzimmer/:short" component={LoadableLehrerzimmer} />
      </AppBar>
      <Route exact path="/pausenhalle" component={LoadablePausenhalle} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
