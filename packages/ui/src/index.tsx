import * as React from "react";
import { render } from "react-dom";
import App from "./App";

import * as ES6Promise from "es6-promise";
ES6Promise.polyfill();

render(<App />, document.getElementById("root"));
