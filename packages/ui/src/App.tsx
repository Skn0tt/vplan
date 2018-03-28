import * as React from "react";
import { Provider } from "react-redux";
import { Reboot, MuiThemeProvider } from "material-ui";
import store from "./etc/store";
import Routes from "./Routes";
import theme from "./theme";
import Loading from "./elements/Loading";
import Messager from "./components/Messager";

const App: React.SFC<{}> = () => (
  <div>
    <Reboot />
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Routes />
        <Messager />
      </MuiThemeProvider>
    </Provider>
  </div>
);

export default App;
