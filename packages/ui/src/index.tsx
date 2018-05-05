import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import * as store from "./etc/store";

import * as ES6Promise from "es6-promise";
ES6Promise.polyfill();

async function init() {
  await store.init();

  render(<App />, document.getElementById("root"));
}

init();
