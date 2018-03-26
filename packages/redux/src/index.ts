import store, { persist } from "./store";
import { AsyncStorage } from "react-native";
import { Entry } from "vplan-types";

export type Config = {
  baseUrl: string;
  storage?: AsyncStorage;
  onNewEntriesReceived?: (entries: Entry[]) => void;
};

export let config: Config = {
  baseUrl: "",
  storage: null,
  onNewEntriesReceived: () => {}
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
export * from "./diff";

export default createStore;
