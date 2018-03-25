import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import AppBar from "./components/AppBar";
import Loading from "./elements/Loading";

const LoadableTeacher = Loadable({
  loader: () => import("./routes/Teacher"),
  loading: Loading
});

const LoadableDisplay = Loadable({
  loader: () => import("./routes/Display"),
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
      <Route exact path="/display" component={LoadableDisplay} />
      <AppBar>
        <Switch>
          <Route exact path="/" component={LoadableHome} />
          <Route exact path="/admin" component={LoadableAdmin} />
          <Route exact path="/teacher" component={LoadableTeacher} />
          <Route path="/teacher/:short" component={LoadableTeacher} />
          <Route path="/:group" component={LoadableHome} />
          <Route component={LoadableNotFound} />
        </Switch>
      </AppBar>
    </Switch>
  </BrowserRouter>
);

export default Routes;
