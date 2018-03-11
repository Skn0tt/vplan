import * as React from "react";
import { Provider } from "react-redux";
import { Reboot } from "material-ui";
import store from "./etc/store";
import Routes from "./Routes";

const App: React.SFC<{}> = () => (
  <div>
    <Reboot />
    <Provider store={store}>
      <Routes />
    </Provider>
  </div>
);

export default App;
