import * as React from "react";
import { Provider } from "react-redux";
import { CssBaseline, MuiThemeProvider } from "material-ui";
import { store } from "./etc/store";
import Routes from "./Routes";
import theme from "./theme";
import Loading from "./elements/Loading";
import Messager from "./components/Messager";
import ShowRefreshtimeAndImprint from "./components/ShowRefreshtimeAndImprint";

/**
 * # Component
 */
class App extends React.PureComponent<{}> {
  /**
   * ## Lifecycle Methods
   */
  componentDidMount() {
    document.title = !!window.__env ? window.__env.UI_TITLE : "vPlan";
  }

  /**
   * ## Render
   */
  render() {
    return (
      <>
        <CssBaseline />
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <ShowRefreshtimeAndImprint>
              <Routes />
            </ShowRefreshtimeAndImprint>
            <Messager />
          </MuiThemeProvider>
        </Provider>
      </>
    );
  }
}

export default App;
