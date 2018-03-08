import store from "./store";

export let config = {
  baseUrl: ""
};

const createStore = (conf: typeof config) => {
  config = conf;
  return store;
};

export * from "./actions";
export * from "./selectors";
export * from "./types";

export default createStore;
