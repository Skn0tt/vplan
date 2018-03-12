import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import * as Loadable from "react-loadable";

import Loading from "./elements/Loading";
import AppBar from "./components/AppBar";

// Routes
const LoadableTeacher = Loadable({
  loader: () => import("./routes/Teacher"),
  loading: Loading
});

const LoadablePausenhalle = Loadable({
  loader: () => import("./routes/Pausenhalle"),
  loading: Loading
});

const LoadableAdmin = Loadable({
  loader: () => import("./routes/Admin"),
  loading: Loading
});

const LoadableHome = Loadable({
  loader: () => import("./routes/Home"),
  loading: Loading
});

const LoadableNotFound = Loadable({
  loader: () => import("./routes/NotFound"),
  loading: Loading
});

const Routes: React.SFC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <AppBar>
        <Switch>
          <Route exact path="/" component={LoadableHome} />
          <Route path="/:group" component={LoadableHome} />
          <Route exact path="/admin" component={LoadableAdmin} />
          <Route exact path="/teacher" component={LoadableTeacher} />
          <Route path="/teacher/:short" component={LoadableTeacher} />
          <Route component={LoadableNotFound} />
        </Switch>
      </AppBar>
      <Route exact path="/pausenhalle" component={LoadablePausenhalle} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
