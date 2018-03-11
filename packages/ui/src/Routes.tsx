import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as Loadable from "react-loadable";

import Loading from "./elements/Loading";

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
    <>
      <Route exact path="/lehrerzimmer" component={LoadableLehrerzimmer} />
      <Route exact path="/pausenhalle" component={LoadablePausenhalle} />
    </>
  </BrowserRouter>
);

export default Routes;
