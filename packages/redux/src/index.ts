import store, { persist } from "./store";
import { AnyEntry } from "vplan-types";

export type Config = {
  baseUrl: string;
  storage?: any;
  onNewEntriesReceived?: (entries: AnyEntry[]) => void;
};

export let config: Config = {
  baseUrl: "",
  storage: null,
  onNewEntriesReceived: () => {}
};

const createStore = async (conf: Config) => {
  config = conf;

  await persist();

  return store;
};

export * from "./actions";
export * from "./selectors";
export * from "./types";
export * from "./store";
export * from "./diff";

export default createStore;
