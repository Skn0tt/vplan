import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
// import * as Loadable from "react-loadable";
import AppBar from "./components/AppBar";

// Routes
import Display from "./routes/Display";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Teacher from "./routes/Teacher";
import NotFound from "./routes/NotFound";

/*
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
*/

const Routes: React.SFC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/display" component={Display} />
      <AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/teacher" component={Teacher} />
          <Route path="/teacher/:short" component={Teacher} />
          <Route path="/:group" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AppBar>
    </Switch>
  </BrowserRouter>
);

export default Routes;
