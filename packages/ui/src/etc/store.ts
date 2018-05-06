import createStore, { AppState } from "vplan-redux";
import { Store } from "redux";
import * as config from "./config";

const { UI_API_URL } = config.get();

const baseUrl = UI_API_URL || `${location.protocol}//${location.hostname}/api`;

export let store: Store<AppState>;

export async function init() {
  store = await createStore({
    baseUrl
  });
}
