import store, { persist } from "./store";
import { AsyncStorage } from "react-native";

export type Config = {
  baseUrl: string;
  storage?: AsyncStorage;
};

export let config: Config = {
  baseUrl: "",
  storage: null
};

const createStore = (conf: Config) => {
  config = conf;

  persist();

  return store;
};

export * from "./actions";
export * from "./selectors";
export * from "./types";
export * from "./store";

export default createStore;
