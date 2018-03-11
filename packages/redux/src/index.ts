import store from "./store";

export type Config = {
  baseUrl: string;
};

export let config: Config = {
  baseUrl: ""
};

const createStore = (conf: Config) => {
  config = conf;
  return store;
};

export * from "./actions";
export * from "./selectors";
export * from "./types";

export default createStore;
